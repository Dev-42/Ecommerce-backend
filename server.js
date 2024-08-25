const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const serverConfig = require("./config/server.config");
const dbconfig = require("./config/db.config");

// Importing models
const { UserModel } = require("./models/user.model");

// Connecting our app to MongoDB database
const main = async () => {
  try {
    const connection = await mongoose.connect(dbconfig.DB_URL);
    console.log("Connected to mongoDB database");

    await init(); // Wait for init to complete

    await mongoose.disconnect(); // Disconnect after init completes
    console.log("Connection disconnected");
  } catch (e) {
    console.log("Error connected to database", e);
  }
};

const init = async () => {
  try {
    let user = await UserModel.findOne({ userId: "admin" }); // Use findOne to fetch a single document
    if (user) {
      console.log("Admin is already present");
      return;
    }
  } catch (e) {
    console.log("Error finding the admin", e);
  }

  try {
    user = await UserModel.create({
      // Use await for async operation
      name: "Dev Bhattacharya",
      userId: "admin",
      email: "devbhattacharya42@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Physics@12", 8),
    });
    console.log("Admin created successfully", user);
  } catch (e) {
    console.log("Error while creating admin", e);
  }
};

main();

// Start our server
app.listen(serverConfig.PORT, () => {
  console.log(`Server started at port ${serverConfig.PORT}`);
});
