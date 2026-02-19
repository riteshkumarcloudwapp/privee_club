import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./src/common/config/envConfig.js";
import database from "./src/common/config/db.js";
import path from "path";

const app = express();

//express method middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(process.cwd(), "public"))); //Express will look inside your public folder and try to find logo.png.

// Serve static files from src/templates
app.use(
  "/templates",
  express.static(path.join(process.cwd(), "src/templates")),
);

//EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// database connectivity
database;
console.log(`Database connected to url ${database.url}`);

//...............ADMIN ROUTES...........................
import { router as adminRouter } from "./src/api/admin/admin_auth/index.js";
app.use("/admin", adminRouter);

//................USER ROUTES...........................

//Auth User
import { router as authUserRouter } from "./src/api/user/auth/index.js";
app.use("/api/auth", authUserRouter);

//User profile and info
import { router as userRouter } from "./src/api/user/user/index.js";
app.use("/api/user", userRouter);

app.listen(config.PORT, (req, res) => {
  console.log(`Server is listning on http://${config.HOST}:${config.PORT}`);
  // console.log(
  //   `Swagger UI available at http://${config.HOST}:${config.PORT}/api/docs`,
  // );
});
