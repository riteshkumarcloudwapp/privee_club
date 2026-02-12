import express from "express";
import {
  userSignUp,
  userSignIn,
  changePassword,
  emailVerification,
  resendOtp,
  forgetPassword,
  verifyResetOtp,
  passwordReset,
  userLogout,
} from "./controller.js";
import { authenticateToken } from "../../../common/middleware/jwtToken.middleware.js";

const router = express.Router();

//user registeration
router.post("/register", userSignUp);

//emial verification
router.post("/verify-email/:id", emailVerification);

//resend otp
router.post("/resend-otp/:id", resendOtp);

//user login
router.post("/login", userSignIn);

//forget password
router.post("/forget-password", authenticateToken, forgetPassword);

//email verification
router.post("/verify-reset-otp", authenticateToken, verifyResetOtp);

//password reset
router.post("/password-reset", authenticateToken, passwordReset);

//change password
router.post("/change-password", authenticateToken, changePassword);

//userLogout
router.post("/logout", authenticateToken, userLogout);

export { router };
