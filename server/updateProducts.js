import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { Product } from "./models/ProductsModel.js";

dotenv.config();

connectDB();

const updateProducts = async () => {
  // Get all products
  const products = await Product.find({});

  // Loop over each product
  for (let product of products) {
    // Initialize an empty reviews array
    product.reviews = [];

    // Initialize rating and numReviews to 0
    product.rating = 0;
    product.numReviews = 0;

    // Save the product
    await product.save();
  }
};

updateProducts()
  .then(() => {
    console.log("Products updated successfully");
    process.exit();
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
    process.exit(1);
  });
