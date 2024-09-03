const { ItemModel } = require("../models/items.model");
const { CategoryModel } = require("../models/category.model");

// Controller to create a new item (Admin only)
exports.createItem = async (req, res) => {
  const { name, price, description, categoryName } = req.body;

  try {
    // Find the category by name
    const category = await CategoryModel.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).send({
        message: "Category not found",
      });
    }

    // Create new item associated with the category
    const item = new ItemModel({
      name,
      price,
      description,
      category: category._id,
    });

    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (e) {
    console.log("Error while creating the item", e);
    res.status(500).send({
      message: "Error while creating the item",
    });
  }
};
// Controller to Update an item(Admin Only)
exports.updateItem = async (req, res) => {
  const { itemId } = req.params;
  const { name, price, description, categoryName } = req.body;

  try {
    // find category by name
    const category = await CategoryModel.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).send({
        message: "Category is not present",
      });
    }
    // Update the item
    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      { name, price, description, category: category._id },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(500).send({
        message: "Item not found,update not possible",
      });
    }
    res.status(200).json(updatedItem);
  } catch (e) {
    console.log("Error while updating the item", e);
    res.status(500).send({
      message: "Error while updating the item",
    });
  }
};
// Controller to delete an item(Admin Only)
exports.deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const deletedItem = await ItemModel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).send({
        message: "Item not found,delete not possible!!",
      });
    }
    res.status(200).send({
      message: "Item deleted successfully",
    });
  } catch (e) {
    console.log("Error while deleting the item", e);
    res.status(500).send({
      message: "Error while deleting the item",
    });
  }
};
