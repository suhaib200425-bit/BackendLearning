const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dateofbirth: String,
  address: String,
  place: String,
  pincode: Number,
});

module.exports = mongoose.model("User", User);