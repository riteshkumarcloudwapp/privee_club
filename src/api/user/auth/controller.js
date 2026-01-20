import joi from "joi";
import User from "../../../models/User.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { generateToken } from "../../../common/middleware/jetToken.middleware.js";

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
        [Op.or]: [{ profile_name }, { email }, { mobile_number }],
      },
    });

    if (existUser) {
      return res.status(401).json({
        status: false,
        data: existUser,
        message: "User already exist!!",
      });
    }

    // password hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = User.create({
      first_name,
      last_name,
      profile_name,
      email,
      mobile_number,
      language,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(501).json({
        statu: false,
        message: "Something went Wrong!!",
      });
    }

    // remove sensetive data from user object ie.
    const { password: _, ...newUser } = user.toJSON();

    return res.status(201).json({
      status: true,
      data: newUser,
      message: "User created Successfully!!",
    });
  } catch (error) {
    console.log("sign-up erorr", error);
    return res.status(501).json({
      status: false,
      message: "Something went wrong!!",
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
    const existUser = User.findOne({
      where: { email },
    });
    if (!existUser) {
      return res.status(401).json({
        status: true,
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
    return res.status(201).json({
      status: true,
      token,
      message: "User login successfully!!",
    });
  } catch (error) {
    console.log("User Sign-In error", error);
    return re.status(501).json({
      status: false,
      message: "Something went wrong!!",
    });
  }
};

// EMAIL VERIFICATION CODE AFTER REGISTRATION
