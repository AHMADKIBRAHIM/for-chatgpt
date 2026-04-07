import { Schema, Types, model, type InferSchemaType } from "mongoose";

const habitSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    icon: { type: String, default: "✅" },
    color: { type: String, default: "#6366f1" },
    frequencyType: {
      type: String,
      enum: ["daily", "specific_days", "x_per_week", "x_per_month"],
      required: true
    },
    frequencyConfig: {
      daysOfWeek: [{ type: Number, min: 0, max: 6 }],
      timesPerWeek: Number,
      timesPerMonth: Number
    },
    targetCount: { type: Number, default: 1, min: 1 },
    unit: { type: String, default: "times" },
    reminderTime: String,
    startDate: { type: Date, required: true },
    endDate: Date,
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    isActive: { type: Boolean, default: true },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

habitSchema.index({ userId: 1, isActive: 1 });
habitSchema.index({ userId: 1, category: 1 });

export type HabitDoc = InferSchemaType<typeof habitSchema>;
export const HabitModel = model("Habit", habitSchema);
