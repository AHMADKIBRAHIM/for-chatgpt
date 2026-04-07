import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth.validation";
import { createUser, validateUser } from "../services/auth.service";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/auth";

export async function register(req: Request, res: Response) {
  const payload = registerSchema.parse(req.body);
  const user = await createUser(payload);
  const tokens = issueTokens(String(user._id), user.email);
  setRefreshCookie(res, tokens.refreshToken);
  res.status(201).json({ user: serializeUser(user), accessToken: tokens.accessToken });
}

export async function login(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);
  const user = await validateUser(payload.email, payload.password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const tokens = issueTokens(String(user._id), user.email);
  setRefreshCookie(res, tokens.refreshToken);
  res.json({ user: serializeUser(user), accessToken: tokens.accessToken });
}

export async function refresh(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });
  const decoded = verifyRefreshToken(refreshToken);
  const tokens = issueTokens(decoded.userId, decoded.email);
  setRefreshCookie(res, tokens.refreshToken);
  return res.json({ accessToken: tokens.accessToken });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("refreshToken");
  res.status(204).send();
}

function issueTokens(userId: string, email: string) {
  const accessToken = signAccessToken({ userId, email });
  const refreshToken = signRefreshToken({ userId, email });
  return { accessToken, refreshToken };
}

function setRefreshCookie(res: Response, refreshToken: string) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth"
  });
}

function serializeUser(user: { _id: unknown; name: string; email: string; language: string; theme: string }) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    language: user.language,
    theme: user.theme
  };
}
