import express from "express";
import { adminDashboard, adminLogin, adminLogout } from "./controller.js";

const router = express.Router();

//login
router.get("/login", adminLogin);
router.post("/login", adminLogin);

router.get("/dashboard", adminDashboard);

router.post("/logout", adminLogout);

export { router };
