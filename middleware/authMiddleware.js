const userregistration = require("../models/UserRegistration");

const authMiddleware = async (req, res, next) => {
  try {
    const user = await userregistration.findById(req.session.userId);
    if (!user) {
      res.redirect("/index");
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authMiddleware;
