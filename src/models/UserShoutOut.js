// models/UserShoutOut.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // adjust path if needed

const UserShoutOut = sequelize.define(
  "UserShoutOut",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    shout_out: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "user_shoutOuts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default UserShoutOut;
