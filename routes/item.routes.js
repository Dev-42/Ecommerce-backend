const itemController = require("../controllers/item.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.mw");

module.exports = (app) => {
  // Route to create a new item in a specific category(Admin Only)
  app.post(
    "/ecomm/api/v1/items",
    [verifyToken, isAdmin],
    itemController.createItem
  );
  // Route to update an item(Admin only)
  app.put(
    "/ecomm/api/v1/items/:itemId",
    [verifyToken, isAdmin],
    itemController.updateItem
  );
  // Route to delete an item(Admin Only)
  app.delete(
    "/ecomm/api/v1/items/:itemId",
    [verifyToken, isAdmin],
    itemController.deleteItem
  );
};
