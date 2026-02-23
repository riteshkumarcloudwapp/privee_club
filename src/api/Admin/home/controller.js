import models from "../../../models/index.js";

// dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // total user count
    const totalUsers = await models.User.count();

    //total male users
    const totalMaleUsers = await models.User.count({
      where: { gender: "male" },
    });
    //total female users
    const totalFemaleUsers = await models.User.count({
      where: { gender: "female" },
    });

    return res.json({
      status: true,
      data: {
        totalUsers,
        totalMaleUsers,
        totalFemaleUsers,
      },
    });
  } catch (error) {
    console.log("dashboardStats error", error);
    return res.status(500).json({
      status: false,
      message: "DashboardStats error",
      error: error.message,
    });
  }
};

//getNewUsers
export const getAllUsers = async (req, res) => {
  try {
    // Example: fetch users awaiting approval
    const users = await models.User.findAll();

    res.render("admin/users/allUsers", {
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//viewUsers
export const viewUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.User.findByPk(id);

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/admin/all-users");
    }

    return res.render("admin/users/view", { user });
  } catch (error) {
    console.log("viewUsers error", error);
    req.flash("error", "Something went wrong");
    return res.redirect("/admin/all-users");
  }
};

//deleteUsers
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await models.User.findByPk(id);

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/admin/all-users");
    }

    // Delete user
    await user.destroy();

    req.flash("success", "User deleted successfully");
    return res.redirect("/admin/all-users");
  } catch (error) {
    console.log("deleteUserById error:", error);
    req.flash("error", "Something went wrong");
    return res.redirect("/admin/all-users");
  }
};
