import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin",
    },
  },
  {
    tableName: "admins",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Admin;
