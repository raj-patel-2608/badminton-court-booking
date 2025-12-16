import mongoose from "mongoose";

const pricingRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ruleType: {
      type: String,
      enum: ["base", "peak_hour", "weekend", "indoor", "equipment", "coach"],
      required: true,
    },
    valueType: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    conditions: {
      type: Object,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const PricingRule = mongoose.model("pricingrule", pricingRuleSchema);

export default PricingRule;
