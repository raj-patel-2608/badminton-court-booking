import PricingRule from "../models/PricingRule.model.js";

const isTimeOverlap = (start, end, ruleStart, ruleEnd) => {
  return start < ruleEnd && end > ruleStart;
};

const getDayCode = (date) =>
  new Date(date)
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase();

export const calculatePrice = async (
  court,
  date,
  startTime,
  endTime,
  equipment = [],
  coach = null
) => {
  const hours = parseInt(endTime) - parseInt(startTime);

  let totalPrice = court.pricePerHour * hours;
  const breakdown = [];

  const rules = await PricingRule.find({ isActive: true });

  for (const rule of rules) {
    let applies = false;
    let amount = 0;

    switch (rule.type) {
      case "court":
        applies = rule.condition.courtType === court.type;
        if (applies && rule.modifierType === "flat") {
          amount = rule.modifierValue * hours;
        }
        break;

      case "time":
        applies = isTimeOverlap(
          startTime,
          endTime,
          rule.condition.startTime,
          rule.condition.endTime
        );
        if (applies && rule.modifierType === "percent") {
          amount = (court.pricePerHour * hours * rule.modifierValue) / 100;
        }
        break;

      case "day":
        applies = rule.condition.days.includes(getDayCode(date));

        if (applies && rule.modifierType === "percent") {
          amount = (court.pricePerHour * hours * rule.modifierValue) / 100;
        }
        break;

      case "coach":
        if (coach) {
          applies = true;
          amount = coach.feePerHour * hours;
        }
        break;

      case "equipment":
        if (!rule.condition?.equipmentId) break;

        const eq = equipment.find(
          (e) =>
            e.equipment &&
            e.equipment.toString() === rule.condition.equipmentId.toString()
        );

        if (eq) {
          applies = true;

          amount = (rule.modifierValue || 0) * (eq.quantity || 1) * hours;
        }
        break;
    }

    if (applies && amount > 0) {
      totalPrice += amount;
      breakdown.push({
        name: rule.name,
        amount,
      });
    }
  }

  return {
    basePrice: court.pricePerHour * hours,
    modifiers: breakdown,
    totalPrice,
  };
};
