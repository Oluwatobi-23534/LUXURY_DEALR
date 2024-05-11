import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: String,
    images: [String],
    description: {
      type: String,
      required: true, // if the description is required
    },
    brand: {
      // Add the brand field
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true, // set default value to true
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    categoryName: {
      type: String,
      required: true,
    },
    subcategoryName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    reviews: [ReviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  { timestamps: true }
);

const ItemSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const SubcategorySchema = new Schema(
  {
    name: String,
    urlName: String,
    items: [ItemSchema],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    promoVideoUrl: String,
  },
  { timestamps: true }
);

const CategorySchema = new Schema(
  {
    name: String,
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
const Product = mongoose.model("Product", ProductSchema);
const Item = mongoose.model("Item", ItemSchema);

export { Category, Subcategory, Product, Item }; // Export both Category and Product models
