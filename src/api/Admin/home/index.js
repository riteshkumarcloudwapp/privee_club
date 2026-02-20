import express from "express";
import { getDashboardStats, getAllUsers } from "./controller.js";

const router = express.Router();

router.get("/dashboard-stats", getDashboardStats);

router.get("/new-users", getAllUsers);

export { router };
