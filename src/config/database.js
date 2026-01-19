import { Sequelize } from "sequelize";
import dbConfig from "../common/config/db.js";

const sequelize = new Sequelize(dbConfig.url, {
  ...dbConfig,
});

export default sequelize;
