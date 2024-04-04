import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { Subcategory } from "./models/ProductsModel.js";

dotenv.config();

connectDB();

const updateSubcategories = async () => {
  // Get all subcategories
  const subcategories = await Subcategory.find({});

  // Loop over each subcategory
  for (let subcategory of subcategories) {
    // Generate urlName by replacing spaces with hyphens and converting to lowercase
    subcategory.urlName = subcategory.name.toLowerCase().replace(/ /g, "-");
    await subcategory.save();
  }
};

updateSubcategories()
  .then(() => {
    console.log("Subcategories updated successfully");
    process.exit();
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
    process.exit(1);
  });
