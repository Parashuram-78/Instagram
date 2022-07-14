const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    userName: { type: "string", required: true },
    email: { type: "string", required: true },
    profileImageUrl: { type: "string", default: ""},
    password: { type: "string", required: true },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
