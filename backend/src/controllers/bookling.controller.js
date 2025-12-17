import Court from "../models/Court.model.js";
import Coach from "../models/Coach.model.js";
import {
  createBookingAtomic,
  cancelBooking,
} from "../services/booking.service.js";

export const createBookingController = async (req, res) => {
  try {
    const { courtId, coachId, equipment, date, startTime, endTime } = req.body;

    const court = await Court.findById(courtId);

    // console.log(court);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }

    let coach = null;
    if (coachId) {
      coach = await Coach.findById(coachId);
      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }
    }

    const booking = await createBookingAtomic({
      userId: req.user._id,
      court,
      coach,
      equipment,
      date,
      startTime,
      endTime,
    });

    // console.log(booking);

    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const cancelBookingController = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await cancelBooking(bookingId, req.user._id);

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
