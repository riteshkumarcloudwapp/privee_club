import express from "express";
import { updateUserProfile } from "./controller.js";
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

export default router;
