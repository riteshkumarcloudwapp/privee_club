import express from "express";
import { userSignUp, userSignIn, changePassword } from "./controller.js";
import { authenticateToken } from "../../../common/middleware/jwtToken.middleware.js";

const router = express.Router();

//user rgeister
router.post("/register", userSignUp);

//user login
router.post("/login", userSignIn);

//chnage password
router.post("/change-password", authenticateToken, changePassword);

export { router };
