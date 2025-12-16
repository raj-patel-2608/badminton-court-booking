import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.model.js";
import Court from "../models/Court.model.js";
import Equipment from "../models/Equipment.model.js";
import Coach from "../models/Coach.model.js";
import PricingRule from "../models/PricingRule.model.js";

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to DB");

    await Promise.all([
      User.deleteMany(),
      Court.deleteMany(),
      Equipment.deleteMany(),
      Coach.deleteMany(),
      PricingRule.deleteMany(),
    ]);

    const user = await User.create({
      name: "Raj Patel",
      email: "raj@gmail.com",
    });

    const courts = await Court.insertMany([
      { name: "Delhi Yard", type: "indoor" },
      { name: "Ahmedabad Yard", type: "indoor" },
      { name: "Mumbai Yard", type: "outdoor" },
      { name: "Benglure Yard", type: "outdoor" },
    ]);

    const equipment = await Equipment.insertMany([
      { name: "Racket", totalQuantity: 10 },
      { name: "Shoes", totalQuantity: 6 },
    ]);

    const coaches = await Coach.insertMany([
      { name: "Nirav Kundariya" },
      { name: "Harshil Soni" },
      { name: "Jaymin Patel" },
    ]);

    const today = new Date().toISOString().split("T")[0];

    await PricingRule.insertMany([
      {
        name: "Base Court Price",
        ruleType: "base",
        valueType: "flat",
        value: 1000,
      },
      {
        name: "Indoor Court Premium",
        ruleType: "indoor",
        valueType: "flat",
        value: 300,
        conditions: { courtType: "indoor" },
      },
      {
        name: "Peak Hour Pricing",
        ruleType: "peak_hour",
        valueType: "percentage",
        value: 20,
        conditions: { start: "18:00", end: "21:00" },
      },
      {
        name: "Weekend Pricing",
        ruleType: "weekend",
        valueType: "percentage",
        value: 15,
      },
      {
        name: "Coach Fee",
        ruleType: "coach",
        valueType: "flat",
        value: 500,
      },
      {
        name: "Racket Fee",
        ruleType: "equipment",
        valueType: "flat",
        value: 150,
        conditions: { equipmentName: "Racket" },
      },
    ]);

    console.log("Seeding completed");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
