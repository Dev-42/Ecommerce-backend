const categoryController = require("../controllers/category.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.mw");

module.exports = (app) => {
  // Route to create a new category (Admin only)
  app.post(
    "/ecomm/api/v1/categories",
    [verifyToken, isAdmin],
    categoryController.createNewCategory
  );
  // Route to get all categories (accessible to all users)
  app.get("/ecomm/api/v1/categories", categoryController.readCategories);
  app.get("/ecomm/api/v1/categories/:id", categoryController.readCategoryById);
  // Route to get all items in a specific category by name (accessible to all users)
  app.get(
    "/ecomm/api/v1/categories/:name/items",
    categoryController.readItemsByCategoryName
  );
  // Route to update a category (Admin only)
  app.put(
    "/ecomm/api/v1/categories/:id",
    [verifyToken, isAdmin],
    categoryController.updateCategory
  );
  // Route to delete a category (Admin only)
  app.delete(
    "/ecomm/api/v1/categories/:id",
    [verifyToken, isAdmin],
    categoryController.deleteCategory
  );
};
