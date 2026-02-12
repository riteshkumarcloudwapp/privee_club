import joi from "joi";
import User from "../../../models/User.js";
import UserPasswordReset from "../../../models/UserPasswordReset.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import generateToken from "./service.js";
import sendEmailSMTP from "../../../utils/emailService.js";

// USER SIGN-UP
export const userSignUp = async (req, res) => {
  try {
    // get data from client side.
    const {
      first_name,
      last_name,
      profile_name,
      email,
      mobile_number,
      language,
      password,
    } = req.body;

    //validation (joi)
    const validation = joi.object({
      first_name: joi.string().trim().required(),
      last_name: joi.string().trim().required(),
      profile_name: joi.string().trim().required(),
      email: joi.string().email().required(),
      mobile_number: joi
        .string()
        .pattern(/^[0-9]{10}$/)
        .required(),
      language: joi.string().default("en"),
      password: joi.string().min(8).required(),
    });
    const { error } = validation.validate(req.body); // it returns 2 things one is success and other is error .
    if (error) return res.json({ status: false, message: error.message });

    // check if User exist or not.
    const existUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { mobile_number }],
      },
    });

    if (existUser) {
      return res.status(401).json({
        status: false,
        message: "User already exist!!",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Expiry in 10 minutes
    const expiry_time = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // password hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      first_name,
      last_name,
      profile_name,
      email,
      mobile_number,
      language,
      password: hashedPassword,
      otp,
      expiry_time,
      is_verified: false,
    });

    // SEND OTP VIA NODEMAILER
    await sendEmailSMTP(
      email,
      "Verify Your Email - Privee Club",
      "email_verification",
      { name: first_name, otp, year: new Date().getFullYear() },
    );

    return res.status(201).json({
      status: true,
      message: "User created successfully. OTP sent to email.",
    });
  } catch (error) {
    console.log("sign-up Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error!!",
      error: error.message,
    });
  }
};

// EMAIL VERIFICATION CODE AFTER REGISTRATION
export const emailVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    //fetch user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found or not registered",
      });
    }

    //verify user
    if (user.is_verified) {
      return res.status(400).json({
        status: false,
        message: "User already verified",
      });
    }

    // verify otp
    if (user.otp !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > user.expiry_time) {
      return res.status(400).json({
        status: false,
        message: "OTP expired",
      });
    }

    await user.update({
      otp: null,
      expiry_time: null,
      is_verified: true,
    });

    return res.status(200).json({
      status: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("emialVerification error", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//RESEND OTP IF EXPIRES
export const resendOtp = async (req, res) => {
  try {
    const { id } = req.params;

    //fetch user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    //check for verification
    if (user.is_verified) {
      return res.status(400).json({
        status: false,
        message: "User already verified",
      });
    }

    //generate otp and resend it.
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Expiry in 10 minutes
    const expiry_time = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await user.update({
      otp,
      expiry_time,
    });

    // SEND OTP VIA NODEMAILER
    await sendEmailSMTP(
      user.email,
      "Verify Your Email - Privee Club",
      "email_verification",
      { name: user.first_name, otp, year: new Date().getFullYear() },
    );

    return res.status(201).json({
      status: true,
      message: "OTP sent to email.",
    });
  } catch (error) {
    console.log("resendOtp error", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// USER SIGN-IN
export const userSignIn = async (req, res) => {
  try {
    // get data from client-side.
    const { email, password } = req.body;

    //validate(JOI)
    const validation = joi.object({
      email: joi.string().required().email(),
      password: joi.string().min(8).required(),
    });

    const { error } = validation.validate(req.body);
    if (error) return res.json({ status: false, message: error.message });

    // check if user exist or not.
    const existUser = await User.findOne({
      where: { email },
    });
    if (!existUser) {
      return res.status(401).json({
        status: false,
        message: "User not registered!!",
      });
    }

    // check password is corerct or not.
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: false,
        message: "Password is Wrong enter new Password!!",
      });
    }

    // Generate jwt token .
    const token = generateToken(existUser);

    // return response
    return res.status(200).json({
      status: true,
      token,
      message: "User login successfully!!",
    });
  } catch (error) {
    console.log("User Sign-In Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

//FORGOT PASSWORD
export const forgetPassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({
        status: false,
        message: "Enter valid email",
      });
    }

    //fetch user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found!!",
      });
    }

    //verify email
    if (user.email !== email) {
      return res.status(401).json({
        status: false,
        message: "User not authenticated!!",
      });
    }

    // send OTP
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Expiry in 10 minutes
    const expiry_time = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await UserPasswordReset.create({
      user_id: id,
      email: user.email,
      otp,
      expires_at: expiry_time,
    });

    // SEND OTP VIA NODEMAILER
    await sendEmailSMTP(
      email,
      "Verify Your Email - Privee Club",
      "email_verification",
      { name: user.first_name, otp, year: new Date().getFullYear() },
    );

    return res.status(201).json({
      status: true,
      message: " OTP sent to email.",
    });
  } catch (error) {
    console.log("forgetPassword error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// EMAIL VERIFICATION CODE AFTER REGISTRATION
export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await UserPasswordReset.findOne({
      where: { email, otp },
    });

    if (!record) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({
        status: false,
        message: "OTP expired",
      });
    }

    await record.destroy();

    return res.status(200).json({
      status: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log("verifyResetOtp error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

//FORGET PASSWORD UPDATION
export const passwordReset = async (req, res) => {
  try {
    const { id } = req.user;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // check for user existance
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found!!",
      });
    }

    //save new password
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    await user.save();

    return res.status(201).json({
      status: true,
      message: "Password reset successfully!!",
    });
  } catch (error) {
    console.log("passwordReset error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

//CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: false,
        message: "Old password and new password are required",
      });
    }
    // check for user existance
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found!!",
      });
    }
    // check if password is correct or not.
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        status: false,
        message: "Enter correct password!!",
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    await user.save();

    return res.status(201).json({
      status: true,
      message: "Password changed successfully!!",
    });
  } catch (error) {
    console.log("chnagePassword Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error!!",
      error: error.message,
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("userLogout error", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// SOCIAL AUTHENTICATION (GOOGLE , FACEBOOK , APPLE)
