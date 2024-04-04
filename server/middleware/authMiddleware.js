import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token is invalid!");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token found!");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an administrator!");
  }
};

export { protect, admin };
