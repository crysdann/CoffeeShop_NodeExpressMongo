const http = require("http");
const express = require("express");
const path = require("path");
const nodemon = require("nodemon");
const ejs = require("ejs");
const mongoose = require("mongoose");
const userPostModel = require("./models/UserPost.js");
const expressSession = require("express-session");

const app = express();

// To tell express to use EJS templating engine
app.set("view engine", "ejs");

global.loggedIn = null;

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// MongoDB connection
const conString =
  "mongodb+srv://talesfaraway:1234@cluster0.jhpqbjr.mongodb.net/";
try {
  const connection = mongoose.connect(conString);
  console.log("Successfully connected to Mongo DB" + connection);
} catch (err) {
  console.log("MongoDB not connected" + err);
}

// Controllers
const indexController = require("./controller/indexController.js");
const aboutController = require("./controller/aboutController.js");
const productsController = require("./controller/productsController.js");
const storeController = require("./controller/storeController.js");
const userpostsController = require("./controller/userpostsController.js");
const postlistController = require("./controller/postlistController.js");
const registerController = require("./controller/registerController.js");
const loginController = require("./controller/loginController.js");
const logoutController = require("./controller/logoutController.js");
const mypostController = require("./controller/myPostController.js");

// middleware
const authMiddleware = require("./middleware/authMiddleware.js");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticatedMiddleware.js");

// Routing
app.get("/index", indexController);
app.get("/about", aboutController);
app.get("/products", productsController);
app.get("/store", storeController);
app.get("/postlist", postlistController);
app.get("/myposts", mypostController);
app.get(
  "/userposts",
  authMiddleware,
  userpostsController.getuserpostsController
);
app.post(
  "/userposts",
  authMiddleware,
  userpostsController.createuserpostsController
);
app.get(
  "/register",
  redirectIfAuthenticated,
  registerController.getregisterController
);
app.post(
  "/userregistration",
  redirectIfAuthenticated,
  registerController.createnewUserRegisterController
);
app.get("/login", redirectIfAuthenticated, loginController.getloginController);
app.post(
  "/userlogin",
  redirectIfAuthenticated,
  loginController.createLoginController
);
app.get("/auth/logout", logoutController);

// initiate server

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("App is listening on port 4000");
});
