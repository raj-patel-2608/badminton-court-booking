import express from "express";
import {
  cancelBookingController,
  createBookingController,
} from "../controllers/bookling.controller.js";
import { mockAuth } from "../middlewares/mockAuth.middleware.js";

const router = express.Router();

router.post("/create", mockAuth, createBookingController);
router.delete("/delete/:bookingId", mockAuth, cancelBookingController);

export default router;
