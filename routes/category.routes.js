const categoryController = require("../controllers/category.controller");
const { verifyToken } = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    verifyToken,
    categoryController.createNewCategory
  );
};
