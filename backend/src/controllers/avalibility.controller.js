import Booking from "../models/Booking.model.js";
import Court from "../models/Court.model.js";
import Coach from "../models/Coach.model.js";
import Equipment from "../models/Equipment.model.js";

// courts 

export const courtAvalibilityController = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Date, Start Time and End Time are required!",
      });
    }

    const conflictingBookings = await Booking.find({
      date,
      status: "confirmed",
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    }).select("courtId");

    const bookedCourtIds = conflictingBookings.map((booked) => booked.courtId);

    const avalibleCourts = await Court.find({
      isActive: true,
      _id: { $nin: bookedCourtIds },
    });

    // console.log(avalibleCourts);

    res.status(200).json({ avalibleCourts: avalibleCourts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// coaches

export const coachAvalibilityController = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        message: "date, startTime, endTime are required",
      });
    }

    const conflictingBookings = await Booking.find({
      date,
      status: "confirmed",
      coach: { $ne: null },
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    }).select("coach");

    const bookedCoachIds = conflictingBookings.map((b) => b.coach);

    const availableCoaches = await Coach.find({
      isActive: true,
      _id: { $nin: bookedCoachIds },
    });

    // console.log(availableCoaches);

    return res.json({ availableCoaches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// equipment

export const equipmentAvalibilityController = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        message: "date, startTime, endTime are required",
      });
    }

    const bookings = await Booking.find({
      date,
      status: "confirmed",
      $expr: {
        $and: [
          { $lt: ["$startTime", endTime] },
          { $gt: ["$endTime", startTime] },
        ],
      },
    });

    const bookedMap = {};

    bookings.forEach((b) => {
      b.equipment.forEach((eq) => {
        const id = eq.equipment.toString();
        bookedMap[id] = (bookedMap[id] || 0) + eq.quantity;
      });
    });

    const allEquipment = await Equipment.find();

    // console.log(allEquipment);

    const result = allEquipment.map((eq) => {
      const bookedQty = bookedMap[eq._id.toString()] || 0;
      const availableQty = Math.max(eq.totalQuantity - bookedQty, 0);

      return {
        _id: eq._id,
        name: eq.name,
        totalQuantity: eq.totalQuantity,
        availableQuantity: availableQty,
      };
    });

    return res.json({
      equipment: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
