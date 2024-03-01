const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userRegistrationSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userRegistrationSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const registrationmodel = mongoose.model(
  "newuserRegistrationModel",
  userRegistrationSchema
);

module.exports = registrationmodel;
