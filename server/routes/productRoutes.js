import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getCategories,
  createCategory,
  getCategoriesbyId,
} from "../controllers/categoriesController.js";
import {
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  updateProduct,
} from "../controllers/productsController.js";
import {
  getSubcategories,
  getSubcategoryById,
} from "../controllers/subcategoriesController.js";
import upload from "../upload.js";

const router = express.Router();

router
  .route("/categories")
  .get(getCategories)
  .post(protect, admin, createCategory);

router.route("/categories/:id").get(getCategoriesbyId);

router.route("/subcategories").get(getSubcategories);

router.route("/subcategories/:id").get(getSubcategoryById);

router.route("/products").get(getProducts);

router
  .route("/products/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/products/:id/review").post(protect, admin, createProductReview);

router.route("/products/category/:categoryName").get(getProductsByCategory);

router
  .route("/products/subcategory/:subcategoryId")
  .get(getProductsBySubcategory);

router.post("/upload", upload.array("images"), (req, res) => {
  // req.files is array of `images` files
  const fileInfos = req.files.map((file) => ({
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
  }));

  res.json(fileInfos);
});

export default router;
