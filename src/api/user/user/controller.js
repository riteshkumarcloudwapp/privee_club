import User from "../../../models/User.js";
import WhatAreYouLookingFor from "../../../models/WhatAreYouLookingFor.js";
import Joi from "joi";

//...............USER SIGN-UP................................

//update user profile
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
      case "intrested_in":
        // validate(joi)
        const validation = Joi.object({
          favorite_music: Joi.string().max(255).allow(null, ""),
          favorite_tv_show: Joi.string().max(255).allow(null, ""),
          favorite_movie: Joi.string().max(255).allow(null, ""),
          favorite_book: Joi.string().max(255).allow(null, ""),
          favorite_sport: Joi.string().max(255).allow(null, ""),
          other: Joi.string().max(255).allow(null, ""),
        });
        const { error } = validation.validate(value);
        if (error) return res.json({ status: false, message: error.message });

        // update
        await user.update({
          favorite_music,
          favorite_tv_show,
          favorite_movie,
          favorite_book,
          favorite_sport,
          other,
        });
        break;

      case "where did you hear about privee club":
        if (!value) {
          return res.status(400).json({
            status: false,
            message: "where did you hear about privee club is required",
          });
        }
        user.source = value;
        await user.save();
        break;

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

//update userInfo
export const userInfo = async (req, res) => {
  try {
    // get data from client side.
    const { id } = req.user;
    const {
      dob,
      height,
      weight,
      body_type,
      hair_color,
      eye_color,
      nationality,
      region,
      sexual_orientation,
      education,
      field_of_work,
      relationship_status,
      zodiac_sign,
      smoking,
      drinking,
      tattoos,
      piercings,
      about_me,
      about_perfect_match,
    } = req.body;
    //validation (joi)
    const validation = Joi.object({
      dob: Joi.date().iso().required(),
      height: Joi.number().positive().required(), // cm
      weight: Joi.number().positive().required(), // kg
      body_type: Joi.string().trim().required(),
      hair_color: Joi.string().trim().required(),
      eye_color: Joi.string().trim().required(),
      nationality: Joi.string().trim().required(),
      region: Joi.string().trim().required(),
      sexual_orientation: Joi.string().trim().required(),
      education: Joi.string().trim().required(),
      field_of_work: Joi.string().trim().required(),
      relationship_status: Joi.string().trim().required(),
      zodiac_sign: Joi.string().trim().required(),
      smoking: Joi.string().valid("no", "occasionally", "yes").required(),
      drinking: Joi.string().valid("no", "occasionally", "yes").required(),
      tattoos: Joi.string().valid("no", "yes").required(),
      piercings: Joi.string().valid("no", "yes").required(),
      about_me: Joi.string().required(),
      about_perfect_match: Joi.string().required(),
    });

    const { error } = validation.validate(req.body);
    if (error) return res.json({ status: false, message: error.message });

    // find the user
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    //updation
    await user.update({
      dob,
      height,
      weight,
      body_type,
      hair_color,
      eye_color,
      nationality,
      region,
      sexual_orientation,
      education,
      field_of_work,
      relationship_status,
      zodiac_sign,
      smoking,
      drinking,
      tattoos,
      piercings,
      about_me,
      about_perfect_match,
    });

    // response
    return res.status(200).json({
      status: true,
      data: user,
      message: "User updated successfully!!",
    });
  } catch (error) {
    console.log("User_Info error", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};

//..........USER PROFILE DETAILS...............................

