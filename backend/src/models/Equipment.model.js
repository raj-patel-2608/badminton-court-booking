import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalQuantity: {
      type: String,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Equipment = mongoose.model("equipment", equipmentSchema);

export default Equipment;
