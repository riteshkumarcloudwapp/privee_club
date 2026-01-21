import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./src/common/config/envConfig.js";
import database from "./src/common/config/db.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const app = express();

//express middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

// file upload on local
app.use("/assets", express.static("assets"));

// view engine set .
// app.set("view engine", ejs);

app.get("/", (req, res) => {
  res.send("hello from server");
});

// database connectivity
database;
console.log(`Database connected to url ${database.url}`);

//....Swagger fro API Documentation.......

//USER SWAGGER
const userSwagger = JSON.parse(
  fs.readFileSync(new URL("./user_swagger.json", import.meta.url)),
);
app.use(
  "/api-docs-admin",
  swaggerUi.serveFiles(userSwagger, {}),
  swaggerUi.setup(userSwagger),
);

app.listen(config.PORT, (req, res) => {
  console.log(`Server is listning on http://${config.HOST}:${config.PORT}`);
  console.log(
    `Swagger UI available at http://${config.HOST}:${config.PORT}/api/docs`,
  );
});
