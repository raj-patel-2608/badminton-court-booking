import mongoose from "mongoose";

const courtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["indoor", "outdoor"],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Court = mongoose.model("court", courtSchema);

export default Court;
