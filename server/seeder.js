import dotenv from "dotenv";
import mongoose from "mongoose";
import users from "./database/users.js";
import {
  categories,
  homeElectronics,
  vrHeadsets,
} from "./database/products.js";
import { Category, Subcategory, Product } from "./models/ProductsModel.js"; // Removed Item import
import Order from "./models/OrderModel.js";
import User from "./models/UserModel.js";
import Bucket from "./models/BucketModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Category.deleteMany();
    await Subcategory.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    // Create some sample bucket data
    const sampleBuckets = createdUsers.map((user) => ({
      user: user._id,
      items: [
        // Add your bucket items here...
      ],
    }));

    // Add the sample bucket data to the database
    await Bucket.insertMany(sampleBuckets);

    const adminUser = createdUsers[2]._id;

    // Create subcategories with embedded items
    const sampleSubcategories = categories.flatMap((category) =>
      category.subcategories.map((subcategory) => {
        const items = subcategory.items.map((item) => ({
          name: item,
          user: adminUser,
        }));
        return {
          name: subcategory.name,
          items,
          user: adminUser,
        };
      })
    );

    const createdSubcategories = await Subcategory.insertMany(
      sampleSubcategories
    );

    // Then create categories with subcategory _id's
    const sampleCategories = categories.map((category, index) => {
      const subcategories = createdSubcategories
        .slice(index, index + category.subcategories.length)
        .map((subcategory) => subcategory._id);
      return { name: category.name, subcategories, user: adminUser };
    });

    const createdCategories = await Category.insertMany(sampleCategories);

    const sampleProducts = [...homeElectronics, ...vrHeadsets]
      .map((product) => {
        const category = createdCategories.find(
          (cat) => cat.name === product.category
        );
        const subcategory = createdSubcategories.find(
          (sub) => sub.name === product.subcategory
        );
        if (!category || !subcategory) {
          console.error(
            `Category or subcategory not found for product ${product.name}`
          );
          return;
        }
        return {
          ...product,
          user: adminUser,
          category: category._id,
          categoryName: category.name,
          subcategory: subcategory._id,
          subcategoryName: subcategory.name,
          quantity: product.quantity || 1, // Add this line
        };
      })
      .filter(Boolean);

    await Product.insertMany(sampleProducts);

    console.log(
      "Added sample categories, subcategories, products, and buckets"
    );
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Category.deleteMany();
    await Subcategory.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
