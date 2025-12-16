import mongoose from "mongoose";

const coachAvalibilitySchema = new mongoose.Schema(
  {
    coachId: {
      type: mongoose.Types.ObjectId,
      ref: "coach",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CoachAvalibility = mongoose.model(
  "coachavalibility",
  coachAvalibilitySchema
);

export default CoachAvalibility;
