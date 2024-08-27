// let's define a middleware which will check the request body is correct or not
const { UserModel } = require("../models/user.model");

const verifySignup = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed ! Please provide your name to register",
      });
    }
    // check for email
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed ! Please provide your email to register",
      });
    }

    // check for userID
    if (!req.body.userId) {
      return res.status(400).send({
        message: "Failed ! Please provide your userId to register",
      });
    }
    // Check if userID is already present then don't allow your user
    let user = await UserModel.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(400).send({
        message: "Failed ! User with the same userID already exits!",
      });
    }
    // Check if name is already present then allow your user
    let userName = await UserModel.findOne({ name: req.body.name });
    if (userName) {
      return res.status(400).send({
        message: "Failed ! User with the same name is already present",
      });
    }
    // Check if email is present then don't allow your user
    let userEmail = await UserModel.findOne({ email: req.body.email });
    if (userEmail) {
      return res.status(400).send({
        message: "Failed! User with this email already exits",
      });
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Error in the request",
      error: "Error while validating the request body",
    });
  }
};

module.exports = { verifySignup };
