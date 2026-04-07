import type { Request, Response } from "express";
import { getSummary } from "../services/analytics.service";

export async function summary(req: Request, res: Response) {
  const range = (req.query.range as "week" | "month" | "year") || "week";
  const data = await getSummary(req.auth!.userId, range);
  res.json(data);
}
