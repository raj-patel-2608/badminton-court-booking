import express from "express";
import cors from "cors";

import healthCheckRouter from "./routes/health.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/healthcheck", healthCheckRouter);

export default app;
