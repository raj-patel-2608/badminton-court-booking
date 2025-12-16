import express from "express";
import cors from "cors";

import healthCheckRouter from "./routes/health.route.js";
import avalibilityRouter from "./routes/avalibility.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/healthcheck", healthCheckRouter);
app.use("/api/avalibility", avalibilityRouter);

export default app;
