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
      { name: "Delhi Yard", type: "indoor", pricePerHour: 1000 },
      { name: "Ahmedabad Yard", type: "indoor", pricePerHour: 1000 },
      { name: "Mumbai Yard", type: "outdoor", pricePerHour: 800 },
      { name: "Benglure Yard", type: "outdoor", pricePerHour: 800 },
    ]);

    const equipment = await Equipment.insertMany([
      { name: "Racket", totalQuantity: 10 },
      { name: "Shoes", totalQuantity: 6 },
    ]);

    const coaches = await Coach.insertMany([
      { name: "Nirav Kundariya", feePerHour: 500 },
      { name: "Harshil Soni", feePerHour: 600 },
      { name: "Jaymin Patel", feePerHour: 700 },
    ]);

    const today = new Date().toISOString().split("T")[0];

    await PricingRule.insertMany([
      {
        name: "indoor court Premium",
        type: "court",
        condition: {
          courtType: "indoor",
        },
        modifierType: "flat",
        modifierValue: 300,
        isActive: true,
      },

      {
        name: "Peak Hour Pricing",
        type: "time",
        condition: {
          startTime: "18:00",
          endTime: "21:00",
        },
        modifierType: "percent",
        modifierValue: 20,
        isActive: true,
      },

      {
        name: "Weekend Pricing",
        type: "day",
        condition: {
          days: ["sat", "sun"],
        },
        modifierType: "percent",
        modifierValue: 15,
        isActive: true,
      },

      {
        name: "Coach Fee",
        type: "coach",
        condition: {},
        modifierType: "flat",
        modifierValue: 0,
        isActive: true,
      },

      {
        name: "Racket Rent",
        type: "equipment",
        condition: {
          equipmentId: equipment[0]._id,
        },
        modifierType: "flat",
        modifierValue: 150,
        isActive: true,
      },
      {
        name: "Shoes Rent",
        type: "equipment",
        condition: {
          equipmentId: equipment[1]._id,
        },
        modifierType: "flat",
        modifierValue: 100,
        isActive: true,
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
