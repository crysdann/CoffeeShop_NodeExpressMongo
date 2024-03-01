const mongoose = require("mongoose");

// Used to define the structure of document in mongoDB
const Schema = mongoose.Schema;

const UserPostSchema = new Schema({
  title: String,
  description: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "newuserRegistrationModel",
    required: true,
  },
  username: String,
  postedDate: { type: Date, default: Date.now },
});

// Creating model
const UserPost = mongoose.model("UserFeedback", UserPostSchema);

// export
module.exports = UserPost;
