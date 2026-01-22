import express from "express";
import { updateUserProfile, userInfo } from "./controller.js";
import authauthenticateToken from "../../../common/middleware/jetToken.middleware.js";

import createMulter from "../../../utils/multer.js";
const upload = createMulter("user");

const router = express.Router();

router.post(
  "/update",
  authauthenticateToken,
  upload.single("best_pic"),
  updateUserProfile,
);

router.post("/user-info", authauthenticateToken, userInfo);

export default router;
