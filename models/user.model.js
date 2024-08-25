const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 10,
      unique: true,
    },
    userType: {
      type: String,
      required: true,
      default: "CUSTOMER",
      enum: ["ADMIN", "CUSTOMER"],
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timeStamps: true,
    versionKey: false,
  }
);
// Collections for user model
const UserModel = mongoose.model("User", userSchema);
module.exports = {
  UserModel,
};
