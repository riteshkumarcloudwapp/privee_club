import express from "express";
import {
  updateUserProfile,
  updateUserInfo,
  getUserProfile,
  editProfile,
  uploadUserPhotos,
  deletePhotos,
  userShout,
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

//edit user profile
router.post(
  "/edit-profile",
  authenticateToken,
  upload.single("best_pic"),
  editProfile,
);

//upload user photos
router.post(
  "/user-photos",
  authenticateToken,
  upload.array("image", 10),
  uploadUserPhotos,
);

//delete user photos
router.post("/delete-photos/:photoId", authenticateToken, deletePhotos);

//user-shoutOut

export { router };
