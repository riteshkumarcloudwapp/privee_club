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
    //pagination
    const limit = parseInt(req.query?.limit) || 5;
    const page = parseInt(req.query?.page) || 1;
    const offset = (page - 1) * limit;

    // Example: fetch users awaiting approval
    const { count, rows } = await models.User.findAndCountAll({
      //rows -> it represents data, count -> total number of records in the database
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    // return res.status(201).json({
    //   status: true,
    //   totalPages,
    //   count,
    //   rows,
    // });
    res.render("admin/users/allUsers", {
      users: rows,
      currentPage: page,
      totalPages,
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
