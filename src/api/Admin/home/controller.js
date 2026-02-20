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

    res.render("admin/users/create", { users });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
