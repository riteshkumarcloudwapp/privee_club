import express from "express";
import config from "./src/common/config/envConfig.js";
import database from "./src/common/config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello from server");
});

// database connectivity
database;
console.log(`Database connected to url ${database.url}`);

app.listen(config.PORT, (req, res) => {
  console.log(`Server is listning on http://${config.HOST}:${config.PORT}`);
  console.log(
    `Swagger UI available at http://${config.HOST}:${config.PORT}/api/docs`,
  );
});
