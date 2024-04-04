import { Category, Subcategory } from "../models/ProductsModel.js";
import asyncHandler from "express-async-handler";

const getSubcategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("subcategories");
  const subcategories = categories.flatMap(
    (category) => category.subcategories
  );
  if (!subcategories.length) {
    res.status(404);
    throw new Error("No subcategories found");
  } else {
    res.json(subcategories);
  }
});

const getSubcategoryById = asyncHandler(async (req, res) => {
  const subcategory = await Subcategory.findById(req.params.id);
  if (!subcategory) {
    res.status(404);
    throw new Error("Subcategory not found");
  } else {
    res.json(subcategory);
  }
});

export { getSubcategories, getSubcategoryById };
