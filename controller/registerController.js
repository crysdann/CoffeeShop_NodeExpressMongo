const registrationModel = require("../models/UserRegistration");

const getregisterController = (req, res) => {
  res.render("register", {
    errors: {},
  });
};

const createnewUserRegisterController = async (req, res) => {
  const { regusername, regpassword, regconfirmpassword } = req.body;
  let errors = {};

  if (!regusername) {
    errors.usernameerror = "Username is required";
  }
  if (!regpassword) {
    errors.passworderror = "Password is required";
  }
  if (!regconfirmpassword) {
    errors.confirmPassworderror = "Confirm Password is required";
  }
  if (regpassword !== regconfirmpassword) {
    errors.passwordMismatch = "Passwords do not match";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).render("register", { errors });
  }
  try {
    const newUserRegistration = await registrationModel.create({
      username: regusername,
      password: regpassword,
    });
    res.redirect("/index");
  } catch (err) {
    console.log("Error registering the user " + err);
    res.redirect("/register");
  }
};

module.exports = { getregisterController, createnewUserRegisterController };
