// We need to write the controller(logic) for registration for the user
const bcrypt = require("bcrypt");
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
