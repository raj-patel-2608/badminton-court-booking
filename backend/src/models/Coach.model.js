import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Coach = mongoose.model("coach", coachSchema);

export default Coach;
