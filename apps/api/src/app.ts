import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { authRouter } from "./routes/auth.routes";
import { requireAuth } from "./middleware/auth";
import { habitRouter } from "./routes/habit.routes";
import { analyticsRouter } from "./routes/analytics.routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/habits", requireAuth, habitRouter);
app.use("/api/analytics", requireAuth, analyticsRouter);

app.use(errorHandler);
