import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const LookingForOption = sequelize.define(
  "LookingForOption",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "looking_for_options",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default LookingForOption;
