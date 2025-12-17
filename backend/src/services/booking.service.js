import mongoose from "mongoose";
import Booking from "../models/Booking.model.js";
import { calculatePrice } from "./pricing.service.js";
import { checkAvailability } from "./chechAvalibility.service.js";

export const createBookingAtomic = async ({
  userId,
  court,
  coach,
  equipment,
  date,
  startTime,
  endTime,
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Re-check availability
    await checkAvailability({
      courtId: court._id,
      coachId: coach?._id,
      date,
      startTime,
      endTime,
      equipment,
    });

    // Calculate prrice
    const pricing = await calculatePrice(
      court,
      date,
      startTime,
      endTime,
      equipment,
      coach
    );

    // Create booking
    const booking = await Booking.create(
      [
        {
          user: userId,
          court: court._id,
          coach: coach?._id || null,
          equipment,
          date,
          startTime,
          endTime,
          pricing,
        },
      ],
      { session }
    );

    // commit
    await session.commitTransaction();
    session.endSession();

    return booking[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    user: userId,
    status: "confirmed",
  });

  if (!booking) {
    throw new Error("Booking not found or already cancelled");
  }

  booking.status = "cancelled";
  await booking.save();

  return booking;
};
