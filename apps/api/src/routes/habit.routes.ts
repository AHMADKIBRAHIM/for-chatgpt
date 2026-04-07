import { Router } from "express";
import {
  createHabit,
  deleteHabit,
  getHabit,
  getLogs,
  listHabits,
  updateHabit,
  upsertHabitLog
} from "../controllers/habit.controller";

export const habitRouter = Router();

habitRouter.post("/", createHabit);
habitRouter.get("/", listHabits);
habitRouter.get("/:habitId", getHabit);
habitRouter.patch("/:habitId", updateHabit);
habitRouter.delete("/:habitId", deleteHabit);
habitRouter.put("/:habitId/logs/:date", upsertHabitLog);
habitRouter.get("/logs/query", getLogs);
