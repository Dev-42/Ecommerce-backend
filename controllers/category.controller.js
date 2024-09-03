// Creating a new category
const { CategoryModel } = require("../models/category.model");
const { ItemModel } = require("../models/items.model");

// Controller to create a new category
exports.createNewCategory = async (req, res) => {
  // Read the req.body
  const { name, description } = req.body;
  // Create the category object
  const categoryObj = {
    name: name,
    description: description,
  };
  try {
    // Insert the req.body into the database
    let categoriesCreated = await CategoryModel.insertMany([categoryObj]);
    let categoryCreated = categoriesCreated[0];
    res.status(201).send(categoryCreated);
    console.log(categoryCreated);
  } catch (e) {
    console.log("Error while creating the category", e);
    res.status(500).send({
      message: "Error while creating the category",
    });
  }

  // return the response to the user that category os succesfully created
};

// Controller to read all categories
exports.readCategories = async (req, res) => {
  try {
    // read all the categories
    let categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (e) {
    console.log("Error while reading the categories", e);
    res.status(500).send({
      message: "Error while reading the categories",
    });
  }
};
// Controller to read all items by category name
exports.readCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the category by id
    const category = await CategoryModel.findById(id);
    res.status(200).json(category);
  } catch (e) {
    console.log("Error in getting category by ID", e);
    res.status(500).send({
      message: "Error while reading the category",
    });
  }
};

// Controller to update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    // Find the category by ID and update it

    let updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).send({
        message: "Category not found.Update not possible",
      });
    }
  } catch (e) {
    console.log("Error while updating the category", e);
    res.status(500).send({
      message: "Error while updating the category",
    });
  }
};

// Controller to delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let deleteCategory = await CategoryModel.findByIdAndDelete(id);
    if (deleteCategory) {
      res.status(200).send({
        message: "Category Deleted successfully",
      });
    } else {
      req.status(404).send({
        message: "Category not found",
      });
    }
  } catch (e) {
    console.log("Error while deleting the category", e);
    res.status(500).send({
      message: "Error while deleting the category",
    });
  }
};

// Read items by category name
exports.readItemsByCategoryName = async (req, res) => {
  try {
    const categoryName = req.params.name;

    // Fetch the category by name
    const category = await CategoryModel.findOne({
      name: categoryName,
    }).populate("items");
    if (!category) {
      return res.status(404).send({
        message: "Category not found",
      });
    }
    // Fetch all the items belonging to this category
    const items = await ItemModel.find({ category: category._id });
    res.status(200).json(items);
  } catch (e) {
    console.log("Error in fetching items by category name", e);
    res.status(500).send({
      message: "Error while fetching items",
    });
  }
};
