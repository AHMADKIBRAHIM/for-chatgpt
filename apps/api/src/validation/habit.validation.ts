import { z } from "zod";

export const habitUpsertSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  category: z.string().min(1),
  icon: z.string().default("✅"),
  color: z.string().default("#6366f1"),
  frequencyType: z.enum(["daily", "specific_days", "x_per_week", "x_per_month"]),
  frequencyConfig: z
    .object({
      daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
      timesPerWeek: z.number().int().positive().optional(),
      timesPerMonth: z.number().int().positive().optional()
    })
    .default({}),
  targetCount: z.number().int().positive().default(1),
  unit: z.string().default("times"),
  reminderTime: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  isActive: z.boolean().default(true),
  notes: z.string().default("")
});

export const logUpsertSchema = z.object({
  value: z.number().nonnegative().default(1),
  completed: z.boolean().default(true),
  note: z.string().default("")
});
