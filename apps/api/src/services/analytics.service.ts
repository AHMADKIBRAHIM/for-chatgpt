import dayjs from "dayjs";
import { Types } from "mongoose";
import { HabitModel } from "../models/Habit";
import { HabitLogModel } from "../models/HabitLog";

export async function getSummary(userId: Types.ObjectId, range: "week" | "month" | "year") {
  const now = dayjs();
  const from =
    range === "week" ? now.subtract(7, "day") : range === "month" ? now.subtract(1, "month") : now.subtract(1, "year");

  const [habits, logs] = await Promise.all([
    HabitModel.find({ userId, isActive: true }),
    HabitLogModel.find({ userId, date: { $gte: from.format("YYYY-MM-DD"), $lte: now.format("YYYY-MM-DD") } })
  ]);

  const completed = logs.filter((l) => l.completed).length;
  const total = logs.length;
  const successRate = total ? Math.round((completed / total) * 100) : 0;

  return {
    range,
    activeHabits: habits.length,
    totalLogs: total,
    completedLogs: completed,
    successRate
  };
}
