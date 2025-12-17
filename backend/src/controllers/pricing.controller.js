import Court from "../models/Court.model.js";
import Coach from "../models/Coach.model.js";
import { calculatePrice } from "../services/pricing.service.js";

export const previewPriceController = async (req, res) => {
  try {
    const { courtId, date, startTime, endTime, equipment, coachId } = req.body;

    // console.log(courtId);

    if (!courtId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "CourtId, Date, StartTime and EndTime are required!",
      });
    }

    const court = await Court.findById(courtId);

    // console.log(court);

    if (!court) {
      return res.status(404).json({
        message: "Court Not Found!",
      });
    }

    let coach = null;
    if (coachId) {
      coach = await Coach.findById(coachId);
      if (!coach) {
        return res.status(404).json({ message: "Coach not found" });
      }
    }

    const price = await calculatePrice(
      court,
      date,
      startTime,
      endTime,
      equipment,
      coach
    );

    // console.log(price);

    res.json(price);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error!");
  }
};
