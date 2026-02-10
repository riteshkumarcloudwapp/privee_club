import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserPhoto = sequelize.define(
  "UserPhoto",
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

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "0 = gallery, 1 = private_photos",
    },
  },
  {
    tableName: "user_photos",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default UserPhoto;
