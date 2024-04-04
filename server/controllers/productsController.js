import { Subcategory, Product } from "../models/ProductsModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    res.status(404);
    throw new Error("No products found");
  } else {
    res.json(products);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  } else {
    res.json(product);
  }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.categoryName });
  if (!products) {
    res.status(404);
    throw new Error("No products found in this category");
  } else {
    res.json(products);
  }
});

const getProductsBySubcategory = asyncHandler(async (req, res) => {
  const products = await Product.find({
    subcategory: req.params.subcategoryId, // subcategoryId from the URL params
  });

  const subcategory = await Subcategory.findById(req.params.subcategoryId);

  if (!products || products.length === 0) {
    res.status(404);
    throw new Error("No products found in this subcategory");
  }

  res.json({ products, subcategory });
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    categoryName,
    subcategoryName,
    quantity,
    price,
    brand,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.categoryName = categoryName;
    product.subcategoryName = subcategoryName;
    product.quantity = quantity;
    product.price = price;
    product.brand = brand;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404)
    throw new Error("Product not found!")
  }
});

export {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySubcategory,
  updateProduct,
};
