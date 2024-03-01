const userPostModel = require("../models/UserPost.js");
const registrationModel = require("../models/UserRegistration.js");
const getuserpostsController = async (req, res) => {
  try {
    res.render("userposts");
  } catch (err) {
    console.log("Error: " + err);
  }
};

const createuserpostsController = async (req, res) => {
  console.log(req.body);
  try {
    const { title, description } = req.body;
    const newUserPost = await userPostModel.create({
      title,
      description,
      userid: req.session.userId,
    });
    console.log("Userpost successfully saved" + newUserPost.userid);
    res.redirect("/index");
  } catch (err) {
    console.log("UserPost is not saved" + err);
    res.status(500).send("Internal server error");
  }
};

module.exports = { getuserpostsController, createuserpostsController };
