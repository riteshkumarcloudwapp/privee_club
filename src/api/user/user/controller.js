import User from "../../../models/User.js";

// USER SELFIE
export const userSelfie = async (req, res) => {
  try {
    const { id } = req.user;

    // check for file data.
    if (!req.file) {
      return res.status(401).json({
        status: false,
        message: "Selfie image is required!!",
      });
    }
    // get image path
    const imagePath = req.file.path;

    // find user
    const user = await findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not registered!!",
      });
    }

    //update Slefie.
    user.slefie = imagePath;
    await User.save();

    // return response
    return res.status(201).json({
      status: true,
      message: "Users Selfie Uploaded Successfully!!",
    });
  } catch (error) {
    console.error("User Selfie API Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// USER BEST PIC
export const userPic = async (req, res) => {
  try {
    const { id } = req.user;

    // check for file data.
    if (!req.file) {
      return res.status(401).json({
        status: false,
        message: "Selfie image is required!!",
      });
    }
    // get image path
    const imagePath = req.file.path;

    // find user
    const user = await findByPk(id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not registered!!",
      });
    }

    //update Slefie.
    user.best_pic = imagePath;
    await User.save();

    // return response
    return res.status(201).json({
      status: true,
      message: "Users best pic Uploaded Successfully!!",
    });
  } catch (error) {
    console.error("User Selfie API Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// USER GENDER API
export const userGender = async (req, res) => {
  try {
    // get data from client side.
    const { gender } = req.body;
    if (!gender) {
      return res.status(401).json({});
    }
  } catch (error) {
    console.log("UserGender Api error", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
