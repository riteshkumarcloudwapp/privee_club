import jwt from "jsonwebtoken";
import config from "../../../common/config/envConfig.js";

export const generateToken = (user) => {
  return jwt.sign({ id: user.id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export { generateToken };
