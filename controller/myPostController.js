const { ObjectId } = require("mongoose").Types;
const userPostModel = require("../models/UserPost.js");

const mypostController = async (req, res) => {
  try {
    const userid = req.session.userId;
    const userIdObject = new ObjectId(userid);
    const listofposts = await userPostModel.find({ userid: userIdObject });

    if (!listofposts || listofposts.length === 0) {
      res.render("myposts", { listofposts: [] });
      return;
    }
    res.render("myposts", { listofposts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = mypostController;
