import type { Request, Response } from "express";
import { HabitModel } from "../models/Habit";
import { HabitLogModel } from "../models/HabitLog";
import { habitUpsertSchema, logUpsertSchema } from "../validation/habit.validation";

export async function createHabit(req: Request, res: Response) {
  const payload = habitUpsertSchema.parse(req.body);
  const habit = await HabitModel.create({ ...payload, userId: req.auth!.userId });
  res.status(201).json(habit);
}

export async function listHabits(req: Request, res: Response) {
  const habits = await HabitModel.find({ userId: req.auth!.userId }).sort({ createdAt: -1 });
  res.json(habits);
}

export async function getHabit(req: Request, res: Response) {
  const habit = await HabitModel.findOne({ _id: req.params.habitId, userId: req.auth!.userId });
  if (!habit) return res.status(404).json({ message: "Habit not found" });
  res.json(habit);
}

export async function updateHabit(req: Request, res: Response) {
  const payload = habitUpsertSchema.partial().parse(req.body);
  const habit = await HabitModel.findOneAndUpdate({ _id: req.params.habitId, userId: req.auth!.userId }, payload, {
    new: true
  });
  if (!habit) return res.status(404).json({ message: "Habit not found" });
  res.json(habit);
}

export async function deleteHabit(req: Request, res: Response) {
  const result = await HabitModel.deleteOne({ _id: req.params.habitId, userId: req.auth!.userId });
  if (!result.deletedCount) return res.status(404).json({ message: "Habit not found" });
  res.status(204).send();
}

export async function upsertHabitLog(req: Request, res: Response) {
  const payload = logUpsertSchema.parse(req.body);
  const log = await HabitLogModel.findOneAndUpdate(
    { userId: req.auth!.userId, habitId: req.params.habitId, date: req.params.date },
    { ...payload, userId: req.auth!.userId, habitId: req.params.habitId, date: req.params.date },
    { upsert: true, new: true }
  );
  res.json(log);
}

export async function getLogs(req: Request, res: Response) {
  const { from, to, habitId } = req.query;
  const logs = await HabitLogModel.find({
    userId: req.auth!.userId,
    ...(habitId ? { habitId } : {}),
    ...(from || to
      ? {
          date: {
            ...(from ? { $gte: String(from) } : {}),
            ...(to ? { $lte: String(to) } : {})
          }
        }
      : {})
  });
  res.json(logs);
}
