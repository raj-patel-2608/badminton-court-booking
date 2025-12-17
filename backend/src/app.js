import express from "express";
import cors from "cors";

import healthCheckRouter from "./routes/health.route.js";
import avalibilityRouter from "./routes/avalibility.route.js";
import pricingRouter from "./routes/pricing.route.js";
import bookingRouter from "./routes/booking.route.js";

import adminRouter from "./routes/admin.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/health", healthCheckRouter);
app.use("/api/avalibility", avalibilityRouter);
app.use("/api/pricing", pricingRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);

export default app;
