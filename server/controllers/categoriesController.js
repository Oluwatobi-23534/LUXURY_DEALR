import { Category, Subcategory, Product } from "../models/ProductsModel.js";
import asyncHandler from "express-async-handler";


const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("subcategories");
  res.json(categories);
});

const getCategoriesbyId = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).populate(
    "subcategories"
  );
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  } else {
    res.json(category);
  }
});


const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, subcategoryName, products } = req.body;

  // Check if the category already exists
  let category = await Category.findOne({ name: categoryName });

  // If the category doesn't exist, create a new one
  if (!category) {
    category = new Category({
      name: categoryName,
    });
    await category.save();
  }

  // Check if the subcategory already exists
  let subcategory = await Subcategory.findOne({ name: subcategoryName });

  // If the subcategory doesn't exist, create a new one
  if (!subcategory) {
    subcategory = new Subcategory({
      name: subcategoryName,
      category: category._id,
      promoVideoUrl: req.body.promoVideoUrl, // Add this line
    });
    await subcategory.save();

    // Add the subcategory to the category's subcategories array
    category.subcategories.push(subcategory._id);
    await category.save();
  }

  // Create new products and associate them with the category and subcategory
  for (let productData of products) {
    const product = new Product({
      name: productData.name,
      category: category._id,
      subcategory: subcategory._id,
      categoryName: categoryName,
      subcategoryName: subcategoryName,
      promoVideoUrl: productData.promoVideoUrl,
      user: req.user._id, // This should be the _id of an existing user
      description: productData.description, // Use the description from the admin interface
      price: productData.price, // Use the price from the admin interface
      images: productData.images, // Use the images from the admin interface
      brand: productData.brand,
    });

    // Save the product
    await product.save();

    // Add the product to the subcategory's items array
    subcategory.items.push({
      _id: product._id,
      name: product.name,
      // other fields...
    });
  }

  // Save the subcategory again to persist the added items
  await subcategory.save();

  res.status(201).json({
    success: true,
    data: category,
  });
});


export { getCategories, getCategoriesbyId, createCategory };