import express from "express";
import { userSignUp, userSignIn } from "./controller.js";

const router = express.Router();

//user rgeister
router.post("/register", userSignUp);

//user login
router.post("/login", userSignIn);

export { router };
