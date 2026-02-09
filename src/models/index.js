import { Sequelize } from "sequelize";
import dbConfig from "../common/config/db.js";

import User from "./User.js";
import LookingForOption from "./LookingForOption.js";
import UserLookingFor from "./UserLookingFor.js";

const sequelize = new Sequelize(dbConfig.url, {
  ...dbConfig,
});

const models = {
  User,
  LookingForOption,
  UserLookingFor,
};

// Setup associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
