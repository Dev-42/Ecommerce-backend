// We need to intercept the user registration route

const authController = require("../controllers/auth.contoller");

module.exports = (app) => {
  // app.post(""/ecomm/api/v1/auth/signup",handover to the correct controller)
  app.post("/ecomm/api/v1/auth/signup", authController.signup);
};
