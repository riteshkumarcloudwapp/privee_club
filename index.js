import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./src/common/config/envConfig.js";
import database from "./src/common/config/db.js";
import path from "path";
import session from "express-session";
import flash from "connect-flash";

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

//Configure Session
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // VERY IMPORTANT for localhost //flash will not work if true.
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  }),
);

// config flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  return res.redirect("/admin/login");
});

// database connectivity
database;
console.log(`Database connected to url ${database.url}`);

//...............ADMIN ROUTES...........................

//Admin Auth
import { router as adminRouter } from "./src/api/Admin/admin_auth/index.js";
app.use("/admin", adminRouter);

//Admin Home
import { router as homeRouter } from "./src/api/Admin/home/index.js";
app.use("/admin", homeRouter);

//................USER ROUTES.............................

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
