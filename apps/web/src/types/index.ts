export type Language = "en" | "ar";
export type Theme = "light" | "dark" | "system";

export type Habit = {
  _id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  targetCount: number;
  unit: string;
};
