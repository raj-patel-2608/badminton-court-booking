import express from "express";
import {
    getCourts, createCourt, updateCourt,
    getPricingRules, createPricingRule, updatePricingRule,
    getEquipment, updateEquipment,
    getCoaches, updateCoach
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/courts", getCourts);
router.post("/courts", createCourt);
router.put("/courts/:id", updateCourt);

router.get("/pricing-rules", getPricingRules);
router.post("/pricing-rules", createPricingRule);
router.put("/pricing-rules/:id", updatePricingRule);

router.get("/equipment", getEquipment);
router.put("/equipment/:id", updateEquipment);

router.get("/coaches", getCoaches);
router.put("/coaches/:id", updateCoach);

export default router;
