const userPostModel = require("../models/UserPost.js");
const registrationModel = require("../models/UserRegistration.js");

const postlistController = async (req, res) => {
  try {
    const listofposts = await userPostModel.find({});

    const usernamePromises = listofposts.map(async (post) => {
      const user = await registrationModel.findById(post.userid);
      return user.username;
    });
    const usernames = await Promise.all(usernamePromises);
    const postsWithUsernames = listofposts.map((post, index) => ({
      ...post.toObject(),
      username: usernames[index],
    }));
    res.render("postlist", {
      listofposts: postsWithUsernames,
    });
  } catch (err) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = postlistController;
