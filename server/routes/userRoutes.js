import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  loginUser,
  registerUser,
  updateUserprofile,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUser,
  getUsers,
  updateUser,
  deleteuser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(protect, admin, getUsers)
router.route("/:id").get(protect, admin, getUser).delete(protect, admin, deleteuser);
router.route("/:id").put(protect, admin, updateUser)

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/update").put(updateUserprofile);
router.route("/logout").get(logoutUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:resetToken").patch(resetPassword);

export default router;
