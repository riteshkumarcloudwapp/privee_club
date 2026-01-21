import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const WhatAreYouLookingFor = sequelize.define(
  "WhatAreYouLookingFor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    looking_for: {
      type: DataTypes.ENUM(
        "love_serious_relationship",
        "fun_and_flirts",
        "sugardating",
        "social_networking",
        "commercial_networking",
        "invites_to_parties_events",
      ),
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "what_are_you_looking_for",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

WhatAreYouLookingFor.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export default WhatAreYouLookingFor;
