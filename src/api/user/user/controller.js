import User from "../../../models/User.js";
import Joi from "joi";
import LookingForOption from "../../../models/LookingForOption.js";
import UserLookingFor from "../../../models/UserLookingFor.js";
import fs from "fs";

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
      /* ================= INTERESTED IN ================= */
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
          favorite_music: value.favorite_music,
          favorite_tv_show: value.favorite_tv_show,
          favorite_movie: value.favorite_movie,
          favorite_book: value.favorite_book,
          favorite_sport: value.favorite_sport,
          other: value.other,
        });
        break;

      /* ================= SOURCE ================= */
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

      /* ================= IMAGE ================= */
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

      /* ================= GENDER ================= */
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

      /* ================= RELATIONSHIP GOAL ================= */
      case "relationship_goal":
        if (!Array.isArray(value) || value.length === 0) {
          return res.status(400).json({
            status: false,
            message: "Relationship goal must be a non-empty array",
          });
        }

        //Remove old relations
        await UserLookingFor.destroy({
          where: { user_id: id },
        });

        //Insert new relations
        const rows = value.map((optionId) => ({
          user_id: id,
          looking_for_option_id: optionId,
        }));

        await UserLookingFor.bulkCreate(rows);

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
export const updateUserInfo = async (req, res) => {
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

//..........USER PROFILE DETAILS.(3rd figma)..............................

//get user profile details
export const getUserProfile = async (req, res) => {
  try {
    // get id
    const { id } = req.user;

    //fetch user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "user not found!!",
      });
    }

    // const userData = user.toJSON();
    // userData.age = calculateAge(userData.dob);

    // response
    return res.status(201).json({
      status: true,
      data: user,
      Messages: "User details fetched successfull!!",
    });
  } catch (error) {
    console.log("userProfile error", error);
    return res.status(501).json({
      status: false,
      message: "Internal server error!!",
      error: error.message,
    });
  }
};

// update user details (single api)
export const updateUser = async (req, res) => {
  try {
    // get data from client
    const { id } = req.user;
    const { type, value } = req.body;

    // fetch user
    const user = await User.findByPk(id);
    if (!user) {
      res.status(401).json({
        status: false,
        message: "user not found!!",
      });
    }

    //...........update...........
    switch (type) {
      //.....Image...........
      case "best_pic":
        if (!req.file) {
          return res.status(401).json({
            status: false,
            message: "Best Pic is required!!",
          });
        }

        //delete old image from local storage
        if (user.best_pic) {
          fs.unlink(user.best_pic, (err) => {
            if (err) console.error("Error deleting old image:", err);
          });
        }

        //update the image
        user.best_pic = req.file.path;
        await user.save();
        break;

      //..........profile_name............
      case "profile_name":
        if (!value) {
          return res.status(401).json({
            status: false,
            message: "Profile_name is required!!",
          });
        }
        user.profile_name = value;
        await user.save();
        break;

      //.....city......
      case "city":
        if (!value) {
          return res.status(400).json({
            status: false,
            message: "City is required",
          });
        }
        user.city = value.trim();
        await user.save();
        break;

      /* ================= RELATIONSHIP GOAL ================= */
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

        existingGoal.looking_for = value;
        await existingGoal.save();
        break;

      //..........About..........
      case "about": {
        const validation = Joi.object({
          about_me: Joi.string().trim().required(),
          my_perfect_match: Joi.string().trim().required(),
        });
        const { error } = validation.validate(value);
        if (error) return res.json({ status: false, message: error.message });

        user.update({
          about: value.about_me,
          about_perfect_match: value.my_perfect_match,
        });
        break;
      }

      //.......info..........
      case "info": {
        const validation = Joi.object({
          age: Joi.number().integer().min(18).max(100).required(),
          height: Joi.number().positive().required(), // cm
          weight: Joi.number().positive().required(), // kg
          hair_color: Joi.string().trim().required(),
          eye_color: Joi.string().trim().required(),
          body_type: Joi.string().trim().required(),
          nationality: Joi.string().trim().required(),
          city: Joi.string().trim().required(),
          sexual_orientation: Joi.string().trim().required(),
          education: Joi.string().trim().required(),
          field_of_work: Joi.string().trim().required(),
          relationship_status: Joi.string().trim().required(),
          zodiac_sign: Joi.string().trim().required(),
          smoking: Joi.string().valid("no", "occasionally", "yes").required(),
          drinking: Joi.string().valid("no", "occasionally", "yes").required(),
          tattoos: Joi.string().valid("no", "yes").required(),
          piercings: Joi.string().valid("no", "yes").required(),
          favorite_music: Joi.string().max(255).allow(null, ""),
          favorite_tv_show: Joi.string().max(255).allow(null, ""),
          favorite_movie: Joi.string().max(255).allow(null, ""),
          favorite_book: Joi.string().max(255).allow(null, ""),
          favorite_sport: Joi.string().max(255).allow(null, ""),
        });

        const { error } = validation.validate({ value });
        if (error) return res.json({ status: false, message: error.message });

        user.create({
          age: value.age,
          height: value.height,
          weight: value.weight,
          hair_color: value.hair_color,
          eye_color: value.eye_color,
          body_type: value.body_type,
          nationality: value.nationality,
          city: value.city,
          sexual_orientation: value.sexual_orientation,
          education: value.education,
          field_of_work: value.field_of_work,
          relationship_status: value.relationship_status,
          zodiac_sign: value.zodiac_sign,
          smoking: value.smoking,
          drinking: value.drinking,
          tattoos: value.tattoos,
          piercings: value.piercings,
          favorite_music: value.favorite_music,
          favorite_tv_show: value.favorite_tv_show,
          favorite_movie: value.favorite_movie,
          favorite_book: value.favorite_book,
          favorite_sport: value.favorite_sport,
        });
        user.save();
        break;
      }

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
