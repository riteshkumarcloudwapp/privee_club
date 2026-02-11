import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // adjust path

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
      type: DataTypes.STRING,
      allowNull: false,
    },

    shout_out: {
      type: DataTypes.STRING(140),
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
  },
  {
    tableName: "user_shout_out",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default UserShoutOut;
