import Booking from "../models/Booking.model.js";
import Equipment from "../models/Equipment.model.js";

export const checkAvailability = async ({
  courtId,
  coachId,
  date,
  startTime,
  endTime,
  equipment = [],
}) => {
  // Court
  const courtConflict = await Booking.findOne({
    court: courtId,
    date,
    status: "confirmed",
    $expr: {
      $and: [
        { $lt: ["$startTime", endTime] },
        { $gt: ["$endTime", startTime] },
      ],
    },
  });

  if (courtConflict) {
    throw new Error("Court already booked for this time");
  }

  // Coach
  if (coachId) {
    const coachConflict = await Booking.findOne({
      coach: coachId,
      date,
      status: "confirmed",
      $expr: {
        $and: [
          { $lt: ["$startTime", endTime] },
          { $gt: ["$endTime", startTime] },
        ],
      },
    });

    if (coachConflict) {
      throw new Error("Coach not available for this time");
    }
  }

  // Equipment
  for (const item of equipment) {
    const equipmentDoc = await Equipment.findById(item.equipment);

    const bookings = await Booking.find({
      date,
      status: "confirmed",
      "equipment.equipment": item.equipment,
      $expr: {
        $and: [
          { $lt: ["$startTime", endTime] },
          { $gt: ["$endTime", startTime] },
        ],
      },
    });

    const bookedQty = bookings.reduce((sum, b) => {
      const eq = b.equipment.find(
        (e) => e.equipment.toString() === item.equipment.toString()
      );
      return sum + (eq?.quantity || 0);
    }, 0);

    if (bookedQty + item.quantity > equipmentDoc.totalQuantity) {
      throw new Error(
        `${equipmentDoc.name} not available in requested quantity`
      );
    }
  }

  return true;
};
