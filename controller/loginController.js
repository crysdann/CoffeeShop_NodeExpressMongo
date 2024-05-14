const registrationModel = require("../models/UserRegistration");
const bcrypt = require("bcrypt");

const getloginController = (req, res) => {
  res.render("login", { errors: {} });
};

const createLoginController = async (req, res) => {
  const { loginusername, loginpassword } = req.body;
  let errors = {};

  if (!loginusername) {
    errors.loginusernameerror = "User name is required";
  }
  if (!loginpassword) {
    errors.loginpassworderror = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.render("login", { errors });
  }

  try {
    const user = await registrationModel.findOne({ username: loginusername });

    if (user) {
      const match = await bcrypt.compare(loginpassword, user.password);
      console.log(match);
      if (match) {
        req.session.userId = user._id;
        res.redirect("/index");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("Login unsuccessful " + err);
    res.redirect("/login");
  }
};

module.exports = { getloginController, createLoginController };
