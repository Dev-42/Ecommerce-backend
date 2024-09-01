const categoryController = require("../controllers/category.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [verifyToken, isAdmin],
    categoryController.createNewCategory
  );
  app.get("/ecomm/api/v1/categories", categoryController.readCategories);
  app.get("/ecomm/api/v1/categories/:id", categoryController.readCategoryById);
  app.put(
    "/ecomm/api/v1/categories/:id",
    [verifyToken, isAdmin],
    categoryController.updateCategory
  );
  app.delete(
    "/ecomm/api/v1/categories/:id",
    [verifyToken, isAdmin],
    categoryController.deleteCategory
  );
};
