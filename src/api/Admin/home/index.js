import express from "express";
import { adminAuth } from "../../../common/middleware/adminAuth.js";
import {
  getDashboardStats,
  getAllUsers,
  viewUserById,
  deleteUserById,
} from "./controller.js";

const router = express.Router();

router.get("/dashboard-stats", getDashboardStats);

router.get("/all-users", adminAuth, getAllUsers);

router.get("/view-user/:id", adminAuth, viewUserById);

router.get("/deleteUser/:id", adminAuth, deleteUserById);

export { router };
