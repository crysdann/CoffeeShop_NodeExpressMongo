const registrationModel = require("../models/UserRegistration");

const getregisterController = (req, res) => {
  res.render("register");
};

const createnewUserRegisterController = async (req, res) => {
  try {
    const newUserRegistration = await registrationModel.create({
      username: req.body.regusername,
      password: req.body.regpassword,
    });
    res.redirect("/index");
  } catch (err) {
    console.log("Error registering the user " + err);
    res.redirect("/register");
  }
};

module.exports = { getregisterController, createnewUserRegisterController };
