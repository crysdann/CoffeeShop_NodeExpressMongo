const userregistration = require("../models/UserRegistration");

const redirectIfAuthenticated = async (req, res, next) => {
  try {
    if (req.session.userId) {
      const user = await userregistration.findById(req.session.userId);
      if (user) {
        res.redirect("/userposts");
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = redirectIfAuthenticated;
