// name,description
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel };
