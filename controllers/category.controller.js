// Creating a new category
const { CategoryModel } = require("../models/category.model");

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
