import express from "express";
import { adminDashboard, adminLogin, adminLogout } from "./controller.js";

const router = express.Router();

//login
router.get("/login", adminLogin);
router.post("/login", adminLogin);

//dashboard
router.get("/dashboard", adminDashboard);

//logout
router.get("/logout", adminLogout);

export { router };
