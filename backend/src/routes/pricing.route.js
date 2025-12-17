import express from "express";
import { previewPriceController } from "../controllers/pricing.controller.js";

const router = express.Router();

router.post("/preview", previewPriceController);

export default router;
