import { Router } from "express";
import {
  Register,
  login,
  refresh,
  logout,
  profile,
  forgetPassword,
  resetPassword,
  onBoarding,
} from "../controller/auth.c.js";
import { AuthMiddleware, loginRateLimiter } from "../middleware/auth.m.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/register", Register);
router.post("/login", loginRateLimiter, login);
router.post("/refresh", AuthMiddleware, refresh);
router.post("/logout", AuthMiddleware, logout);
router.get("/profile", AuthMiddleware, profile);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/onboarding", AuthMiddleware, upload.single("profilePic"), onBoarding);

export default router;
