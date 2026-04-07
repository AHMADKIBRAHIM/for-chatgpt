import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    language: { type: String, enum: ["en", "ar"], default: "en" },
    theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
    timezone: { type: String, default: "UTC" },
    weekStartsOn: { type: Number, min: 0, max: 6, default: 1 },
    notificationPreferences: {
      pushEnabled: { type: Boolean, default: true },
      remindersEnabled: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof userSchema>;
export const UserModel = model("User", userSchema);
