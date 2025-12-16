import Booking from "../models/Booking.model.js";
import Court from "../models/Court.model.js";
import Coach from "../models/Coach.model.js";
import Equipment from "../models/Equipment.model.js";

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

    res.status(200).json({ avalibleCourts: avalibleCourts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const coachAvalibilityController = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;

    if (!date || !startTime || !endTime) {
      res.status(400).json({
        message: "Date, Start Time and End Time are required!",
      });
    }

    const conflictingBookings = await Booking.find({
      date,
      status: "confirmed",
      coachId: { $ne: null },
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    }).select("coachId");

    const bookedCoachIds = conflictingBookings.map((booked) => booked.coachId);

    const avalibleCoaches = await Coach.find({
      isActive: true,
      _id: { $nin: bookedCoachIds },
    });

    res.status(200).json({
      avalibleCoaches: avalibleCoaches,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

export const equipmentAvalibilityController = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;

    if (!date || !startTime || !endTime) {
      res.status(400).json({
        message: "Date, StartTime and EndTime are required!",
      });
    }

    const conflictingBookings = await Booking.find({
      date,
      status: "confirmed",
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    }).select("equipment");

    const bookedMap = {};

    conflictingBookings.forEach((booking) => {
      bookedMap.equipment.forEach((item) => {
        const key = item.equipmentId.toString();
        bookedMap[key] = (bookedMap[key] || 0) + item.quantity;
      });
    });

    const equipmentList = await Equipment.find({ isActive: true });

    const response = equipmentList.map((eq) => {
      const bookedQty = bookedMap[eq._id.toString()] || 0;
      const availableQty = Math.max(eq.totalQuantity - bookedQty, 0);

      return {
        _id: eq._id,
        name: eq.name,
        totalQuantity: eq.totalQuantity,
        availableQuantity: availableQty,
      };
    });

    res.json({ equipments: response });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal Server error!" });
  }
};
