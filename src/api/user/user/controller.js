import User from "../../../models/User.js";
import Joi from "joi";
import LookingForOption from "../../../models/LookingForOption.js";
import UserLookingFor from "../../../models/UserLookingFor.js";
import UserPhoto from "../../../models/UserPhotos.js";
import UserShoutOut from "../../../models/UserShoutOut.js";
import fs from "fs";
import path from "path";

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
export const editProfile = async (req, res) => {
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

      //.......city..........
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

      //.......DOB..........
      case "dob":
        if (!value) {
          return res.status(400).json({
            status: false,
            message: "DOB is required",
          });
        }

        // Validate format YYYY-MM-DD
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (!regex.test(value)) {
          return res.status(400).json({
            status: false,
            message: "DOB must be in YYYY-MM-DD format",
          });
        }

        user.dob = value;
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
        const existingGoal = await UserLookingFor.findAll({
          where: { user_id: id },
        });

        // delete the old ones
        await UserLookingFor.destroy({
          where: { user_id: id },
        });

        // insert new ones
        const rows = value.map((optionId) => ({
          user_id: id,
          looking_for_option_id: optionId,
        }));
        await UserLookingFor.bulkCreate(rows);
        break;

      /* ================= ABOUT ME ================= */
      case "about_me":
        if (!value) {
          return res.status(400).json({
            status: false,
            message: "About me is required",
          });
        }
        user.about_me = value;
        await user.save();
        break;

      /* ================= PERFECT MATCH ================= */
      case "about_perfect_match":
        if (!value) {
          return res.status(400).json({
            status: false,
            message: "About perfect match is required",
          });
        }
        user.about_perfect_match = value;
        await user.save();
        break;

      //...............info...................
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

        const { error } = validation.validate(value);
        if (error) return res.json({ status: false, message: error.message });

        await user.update({
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

//upload user photos
export const uploadUserPhotos = async (req, res) => {
  try {
    const { id } = req.user;
    const { type } = req.body; // 0 = gallery, 1 = private

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found!!",
      });
    }

    // validate files
    if (!req.files || req.files.length === 0) {
      return res.status(401).json({
        status: false,
        message: "Atleast one image required!!",
      });
    }

    // prepare bulk data
    const imagesData = req.files.map((file) => ({
      user_id: id,
      image: file.path,
      title: type,
    }));

    // bulk insert
    await UserPhoto.bulkCreate(imagesData);

    return res.status(200).json({
      status: true,
      message:
        type == 0
          ? "Gallery photos uploaded successfully"
          : "Private photos uploaded successfully",
    });
  } catch (error) {
    console.log("user photos error", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//update user photos
export const deletePhotos = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { photoId } = req.params;

    if (!photoId) {
      return res.status(401).json({
        status: false,
        message: "photoId is required!!",
      });
    }

    //fetch photo
    const photo = await UserPhoto.findOne({
      where: {
        id: photoId,
        user_id: user_id,
      },
    });
    // console.log("-----", photo);
    if (!photo) {
      return res.status(404).json({
        status: false,
        message: "Photo not found or not authorized",
      });
    }

    //  get ABSOLUTE path
    const absolutePath = path.join(process.cwd(), photo.image);
    // console.log("absolutrePtah", absolutePath);

    // delete file from local storage
    if (photo.image && fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    // destroy from db
    await photo.destroy();

    return res.status(201).json({
      status: true,
      message: "Image removed successfully!!",
    });
  } catch (error) {
    console.log("deletePhotos error", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//user shout-out
export const giveShoutout = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { shout_out } = req.body;

    const validation = Joi.object({
      shout_out: Joi.string().trim().min(1).max(140).required(),
    });
    const { error } = validation.validate(req.body);
    if (error) return res.json({ status: false, message: error.message });

    // check for file data.
    if (!req.file) {
      return res.status(401).json({
        status: false,
        Messages: "Image is required!!",
      });
    }
    const imagePath = req.file.path;

    //create shouout
    const shouout = await UserShoutOut.create({
      user_id,
      image: imagePath,
      shout_out: shout_out,
    });

    if (!shouout) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    }

    return res.status(201).json({
      status: true,
      message: "shoutOut created successfull!!",
      data: shouout,
    });
  } catch (error) {
    console.log("User ShoutOut error", error);
    return res.json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
