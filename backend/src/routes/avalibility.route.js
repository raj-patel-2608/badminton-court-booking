import express from "express";
import {
  courtAvalibilityController,
  coachAvalibilityController,
  equipmentAvalibilityController,
} from "../controllers/avalibility.controller.js";
const router = express.Router();

router.get("/courts", courtAvalibilityController);
router.get("/coaches", coachAvalibilityController);
router.get("/equipments", equipmentAvalibilityController);

export default router;
