import User from "../../../models/User.js";
import WhatAreYouLookingFor from "../../../models/WhatAreYouLookingFor.js";

export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { type, value } = req.body;

    if (!type) {
      return res.status(400).json({
        status: false,
        message: "Type is required",
      });
    }

    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not registered",
      });
    }

    switch (type) {
      case "best_pic":
        if (!req.file) {
          return res.status(400).json({
            status: false,
            message: "Best pic image is required",
          });
        }
        user.best_pic = req.file.path;
        await user.save();
        break;

      case "gender":
        if (!value) {
          return res.status(400).json({
            status: false,
            message: "Gender is required",
          });
        }
        user.gender = value;
        await user.save();
        break;

      case "relationship_goal":
        if (!value) {
          return res.status(400).json({
            status: false,
            message: "Relationship goal is required",
          });
        }

        // find existing relationship goal
        const existingGoal = await WhatAreYouLookingFor.findOne({
          where: { user_id: id },
        });

        if (existingGoal) {
          // update
          existingGoal.looking_for = value;
          await existingGoal.save();
        } else {
          // create
          await WhatAreYouLookingFor.create({
            user_id: id,
            looking_for: value,
          });
        }
        break;

      default:
        return res.status(400).json({
          status: false,
          message: "Invalid type",
        });
    }

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update User Profile Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
