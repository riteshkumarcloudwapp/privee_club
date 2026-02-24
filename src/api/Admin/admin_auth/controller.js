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
      if (error) {
        req.flash("error", error.message);
        return res.redirect("/admin/login");
      }

      // check for admin
      const admin = await Admin.findOne({
        where: { email },
      });

      if (!admin) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/admin/login");
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/admin/login");
      }

      // //jwt
      // const token = generateToken({
      //   id: admin.id,
      //   role: "admin",
      // });

      // If login success
      req.session.admin = {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      };

      req.flash("success", "Admin login successful!");
      return res.redirect("/admin/dashboard");
    }

    res.render("admin/pages/login", {
      layout: false,
    });
  } catch (error) {
    console.log("adminRegister error", error);
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/admin/login");
  }
};

//Admin dashboard
export const adminDashboard = async (req, res) => {
  try {
    return res.render("admin/dashboard");
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
  delete req.session.admin;

  req.flash("success", "Admin logged out successfully!");

  return res.redirect("/admin/login");
};
