// We need to intercept the user registration route

const authController = require("../controllers/auth.contoller");
const { verifySignup, verifySignin } = require("../middlewares/auth.mw");

module.exports = (app) => {
  // app.post(""/ecomm/api/v1/auth/signup",handover to the correct controller)
  app.post("/ecomm/api/v1/auth/signup", verifySignup, authController.signup);
  // route for signin
  app.post("/ecomm/api/v1/auth/signin", verifySignin, authController.signin);
};
