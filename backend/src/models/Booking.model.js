import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
      required: true,
    },

    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
      default: null,
    },

    equipment: [
      {
        equipment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Equipment",
        },
        quantity: Number,
      },
    ],

    date: {
      type: String, // "2025-12-28"
      required: true,
    },

    startTime: {
      type: String, // "18:00"
      required: true,
    },

    endTime: {
      type: String, // "20:00"
      required: true,
    },

    pricing: {
      basePrice: Number,
      modifiers: [
        {
          name: String,
          amount: Number,
        },
      ],
      totalPrice: Number,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
