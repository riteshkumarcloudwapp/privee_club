import Joi from "joi";
import Admin from "../../../models/Admin.js";
import generateToken from "../../user/auth/service.js";
import bcrypt from "bcrypt";

// Admin login
export const adminLogin = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;
      //validate
      const validation = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });
      const { error } = validation.validate(req.body);
      if (error) return res.json({ status: false, message: error.message });

      // check for admin
      const admin = await Admin.findOne({
        where: { email },
      });

      if (!admin) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      //jwt
      const token = generateToken({
        id: admin.id,
        role: "admin",
      });

      // Store inside session
      req.session.admin = {
        id: admin.id,
        email: admin.email,
        token,
      };

      return res.redirect("/admin/dashboard");
    }

    return res.render("admin/pages/login");
  } catch (error) {
    console.log("adminRegister error", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Admin dashboard
export const adminDashboard = async (req, res) => {
  try {
    return res.render("admin/layouts/master");
  } catch (error) {
    console.log("viewDashboard error", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Admin logout
export const adminLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Session destroy error:", err);
      return res.redirect("/admin/dashboard");
    }

    res.clearCookie("connect.sid"); // remove session cookie
    return res.redirect("/admin/login");
  });
};
