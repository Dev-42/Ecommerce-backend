// let's define a middleware which will check the request body is correct or not
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

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
    // Check if name is already present then don't allow this user
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

const verifySignin = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "Please provide your userID",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "Please provide your password",
    });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  // Check if the token is present in the header or not
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token found! You are unauthorised to veiw this.",
    });
  }
  // Check the validity of the token
  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unauthorised!",
      });
    }
    const user = await UserModel.findOne({ userId: decoded.userId });
    if (!user) {
      return res.status(400).send({
        message: "Unauthorised ! The token for this user doenst exist",
      });
    }
    // Let's user our user fetched from the database from the next middleware
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.userType !== "ADMIN") {
    return res.status(403).send({
      message: "Only Admin users are authorised to veiw this page!",
    });
  }
  next();
};

module.exports = { verifySignup, verifySignin, verifyToken, isAdmin };
