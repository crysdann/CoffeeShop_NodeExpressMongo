const registrationModel = require("../models/UserRegistration");
const bcrypt = require("bcrypt");

const getloginController = (req, res) => {
  res.render("login");
};

const createLoginController = async (req, res) => {
  try {
    const { loginusername, loginpassword } = req.body;
    const user = await registrationModel.findOne({ username: loginusername });
    console.log(user);
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
