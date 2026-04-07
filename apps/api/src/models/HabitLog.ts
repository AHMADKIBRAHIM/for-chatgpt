import { Schema, Types, model, type InferSchemaType } from "mongoose";

const habitLogSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    habitId: { type: Types.ObjectId, ref: "Habit", required: true, index: true },
    date: { type: String, required: true },
    value: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    note: { type: String, default: "" }
  },
  { timestamps: true }
);

habitLogSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });
habitLogSchema.index({ userId: 1, date: -1 });

export type HabitLogDoc = InferSchemaType<typeof habitLogSchema>;
export const HabitLogModel = model("HabitLog", habitLogSchema);
