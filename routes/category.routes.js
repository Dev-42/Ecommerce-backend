const categoryController = require("../controllers/category.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [verifyToken, isAdmin],
    categoryController.createNewCategory
  );
};
