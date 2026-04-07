import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.slice(7);
  try {
    req.auth = verifyAccessToken(token);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
