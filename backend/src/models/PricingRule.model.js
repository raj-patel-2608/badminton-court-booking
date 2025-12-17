import mongoose from "mongoose";

const pricingRuleSchema = new mongoose.Schema({
  name: { type: String, required: true },

  type: {
    type: String,
    enum: ["court", "time", "day", "equipment", "coach"],
    required: true,
  },

  condition: {
    startTime: String,
    endTime: String,
    days: [String],
    courtType: String,
    equipmentId: mongoose.Schema.Types.ObjectId,
  },

  modifierType: {
    type: String,
    enum: ["flat", "percent"],
    required: true,
  },

  modifierValue: {
    type: Number,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

const PricingRule = mongoose.model("pricingrule", pricingRuleSchema);

export default PricingRule;
