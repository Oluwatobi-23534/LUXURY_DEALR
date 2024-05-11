import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { Subcategory, Product, Item } from "./models/ProductsModel.js";

dotenv.config();

connectDB();

// Get all subcategories
Subcategory.find()
  .then((subcategories) => {
    // Check if subcategories is defined
    if (!subcategories) {
      console.error("No subcategories found");
      return;
    }

    // For each subcategory
    subcategories.forEach(async (subcategory) => {
      // make this async
      // Check if subcategory.items is defined
      if (!subcategory.items) {
        console.error(`No items found for subcategory ${subcategory._id}`);
        return;
      }

      // For each item in the subcategory
      for (let i = 0; i < subcategory.items.length; i++) {
        // use a regular for loop
        let item = subcategory.items[i];
        // Find the corresponding product
        const product = await Product.findOne({ name: item.name });

        // If the product exists
        if (product) {
          // Update the item's _id to match the product's _id
          item._id = product._id;
        }
      }

      // Save the subcategory
      await subcategory.save(); // await the save operation
    });
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
    process.exit(1);
  });
