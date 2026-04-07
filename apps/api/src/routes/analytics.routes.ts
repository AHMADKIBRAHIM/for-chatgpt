import { Router } from "express";
import { summary } from "../controllers/analytics.controller";

export const analyticsRouter = Router();

analyticsRouter.get("/summary", summary);
