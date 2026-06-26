import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";
import { sendMail } from "../utils/mailer.js";
import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import PasswordResetToken from "../models/passwordResetToken.model.js";
import Onboarding from "../models/onboarding.model.js";



export const Register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(411).json({
      message: "input field is missing",
    });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(411).json({
        message: "user is already exist",
      });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      isOnboarding: false,
    });

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = crypto.randomBytes(40).toString("hex");

    await RefreshToken.findOneAndUpdate(
      { userId: user._id.toString() },
      {
        token: refreshToken,
        userId: user._id.toString(),
        user: user._id as mongoose.Types.ObjectId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      { upsert: true },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(411).json({
      message: "input field is missing",
    });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    const accessToken = jwt.sign(
      { userId: user._id as any },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );

    const refreshToken = crypto.randomBytes(40).toString("hex");

    await RefreshToken.findOneAndUpdate(
      { userId: user._id.toString() },
      {
        token: refreshToken,
        userId: user._id.toString(),
        user: user._id as mongoose.Types.ObjectId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      { upsert: true },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({
      message: "No refresh token",
    });
    return;
  }

  try {
    const stored = await RefreshToken.findOne({ token: refreshToken });

    if (!stored) {
      res.status(403).json({
        message: "Invalid refresh token (reuse detected)",
      });
      return;
    }

    const newRefreshToken = crypto.randomBytes(40).toString("hex");

    await RefreshToken.findByIdAndUpdate(stored._id, {
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const newAccessToken = jwt.sign(
      { userId: stored.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" },
    );

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await RefreshToken.deleteMany({ token: refreshToken });
  }

  res.json({ message: "Logged out" });
};

export const profile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(411).json({
      message: "input field is missing",
    });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const resetToken = crypto.randomBytes(40).toString("hex");

    await PasswordResetToken.findOneAndUpdate(
      { userId: user._id.toString() },
      {
        token: resetToken,
        userId: user._id.toString(),
        user: user._id as mongoose.Types.ObjectId,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
      { upsert: true },
    );

    const resetLink = `http://localhost:3000/api/v1/auth/reset-password?token=${resetToken}`;

    await sendMail(
      user.email,
      "Reset Password",
      `
      <h2>Password Reset</h2>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 10 minutes.</p>
    `,
    );

    res.status(200).json({
      message: "Reset link sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = req.query.token as string;
  const { password } = req.body;

  if (!token || !password) {
    res.status(400).json({
      message: "Input field is missing",
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      message: "Password must be at least 6 characters",
    });
    return;
  }

  try {
    const stored = await PasswordResetToken.findOne({ token });

    if (!stored) {
      res.status(400).json({
        message: "Invalid reset token",
      });
      return;
    }

    if (stored.expiresAt < new Date()) {
      res.status(403).json({
        message: "Reset token expired",
      });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.updateOne(
      { _id: stored.userId },
      { password: hashed }
    );

    await PasswordResetToken.deleteMany({ token });

    await PasswordResetToken.deleteMany({ userId: stored.userId });

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const onBoarding = async (req:Request , res:Response)=>{
  const userId = req.userId;

  if(!userId){
    res.status(401).json({
      message:"Unauthorized"
    })
    return;
  }

  const {bio} = req.body;

  if(!bio){
    res.status(411).json({
      message:"input field is missing"
    })
    return;
  }
  try{
    const user= await User.findById(userId);

    if(!user){
      res.status(404).json({
        message:"User not found"
      })
      return;
    }

    const onboarding = await Onboarding.create({
      bio: bio,
      id: new mongoose.Types.ObjectId().toString(),
      userId: user._id.toString(),
      user: user._id as mongoose.Types.ObjectId
    })

    const updatedUser = await User.findByIdAndUpdate(userId,{
      isOnboarding:true,
      onboarding: onboarding._id as mongoose.Types.ObjectId
    },{new:true})

    res.status(200).json({
      message:"Onboarding completed successfully",
      user:updatedUser,
      onboarding:onboarding
    })

  }catch(error: any){
    console.error(error);
    res.status(500).json({
      message:"Internal server error"
    })
  }
}
