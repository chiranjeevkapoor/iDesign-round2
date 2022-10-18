const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email must be provided"],
  },
  password: {
    type: String,
    required: [true, "password must be provided"],
  },
  name: {
    type: String,
    required: [true, "name must be provided"],
  },
  city: {
    type: String,
    required: [true, "City must be provided"],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", usersSchema);
