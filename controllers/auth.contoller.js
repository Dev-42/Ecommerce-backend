// We need to write the controller(logic) for registration for the user
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/auth.config");
const { UserModel } = require("../models/user.model");

exports.signup = async (req, res) => {
  // Logic to create the user
  // 1.Read the req.body
  const { name, userId, email, userType, password } = req.body;
  // 2. Store the user information from req.body to Users collection in mongoDB
  const userObj = {
    name: name,
    userId: userId,
    email: email,
    userType: userType,
    password: bcrypt.hashSync(password, 8),
  };
  try {
    let users_created = await UserModel.insertMany([userObj]);
    const user_created = users_created[0];
    const resultObj = {
      name: user_created.name,
      userId: user_created.userId,
      email: user_created.email,
      userType: user_created.userType,
    };
    res.status(201).send(resultObj);
    console.log(resultObj);
  } catch (e) {
    console.log("Error while registering the user", e);
    res.status(500).send({
      message: "Some error happened while registering the user",
    });
  }
  // 3. Return the response to the user
};

exports.signin = async (req, res) => {
  // Check if the userID is present in the system
  let user = await UserModel.findOne({ userId: req.body.userId });
  if (user === null) {
    return res.status(400).send({
      message: "UserID passed is not a valid one",
    });
  }
  // Check the password is correct or nor
  let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({
      message: "Please check your password",
    });
  }
  // If above two conditions match we will pass a token to our use.The token will be generated by using JWT
  const token = jwt.sign({ userId: user.userId }, secretKey.secret, {
    expiresIn: "24h",
  });
  res.status(200).send({
    name: user.name,
    userID: user.userId,
    email: user.email,
    userType: user.userType,
    accesstoken: token,
  });
};
