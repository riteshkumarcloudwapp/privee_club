import express from "express";
import {
  updateUserProfile,
  updateUserInfo,
  getUserProfile,
  updateUser,
} from "./controller.js";
import { authenticateToken } from "../../../common/middleware/jwtToken.middleware.js";

import createMulter from "../../../utils/multer.js";
const upload = createMulter("user");

const router = express.Router();

//update user profile
router.post(
  "/user-profile",
  authenticateToken,
  upload.single("best_pic"),
  updateUserProfile,
);

//update user-info fileds
router.post("/user-info", authenticateToken, updateUserInfo);

//get user profile details
router.get("/user-detail", authenticateToken, getUserProfile);

//.......Update routes (3rd figma)............
router.post(
  "/update-user",
  authenticateToken,
  upload.single("best_pic"),
  updateUser,
);

export { router };
