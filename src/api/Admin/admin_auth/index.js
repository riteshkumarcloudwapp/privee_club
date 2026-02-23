import express from "express";
import { adminDashboard, adminLogin, adminLogout } from "./controller.js";
import { adminAuth } from "../../../common/middleware/adminAuth.js";

const router = express.Router();

//public routes
//login
router.get("/login", adminLogin);
router.post("/login", adminLogin);

// Protected routes
//dashboard
router.get("/dashboard", adminAuth, adminDashboard);
//logout
router.get("/logout", adminAuth, adminLogout);

export { router };
