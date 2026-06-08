import type { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import RefreshToken from "../models/refreshToken.model.js";

declare module "express" {
  interface Request {
    userId?: string;
  }
}

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const stored = await RefreshToken.findOne({ token });

    if (!stored) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    req.userId = stored.userId;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});
