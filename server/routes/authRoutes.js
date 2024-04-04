import express from "express";
import passport from "passport";
import axios from "axios"; // Corrected here
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// authenticate the user using google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}login/failed`,
  })
);

// forward the request to google's authentication server
router.get("/google", async (req, res) => {
  try {
    const response = await axios.get(
      "https://accounts.google.com/o/oauth2/v2/auth",
      {
        params: req.query,
      }
    );
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

// register or login user to database
router.get("/login/success", async (req, res) => {
  if (req.user) {
    let userExists = await User.findOne({ email: req.user._json.email });
    if (userExists) {
      generateToken(res, userExists._id);
    } else {
      const newUser = new User({
        username: req.user._json.email.split("@")[0],
        name: req.user.username,
        email: req.user._json.email,
        password: Date.now(), // dummy password
        authMethod: "google", // set authMethod to 'google'
      });
      generateToken(res, newUser._id);
      await newUser.save();
      userExists = newUser; // assign newUser to userExists
    }
    res.status(200).json({
      user: { ...req.user, isAdmin: userExists.isAdmin },
      message: "Successfully logged in",
      _id: userExists._id,
    });
  } else {
    res.status(200).json({
      message: "Welcome! Please log in to access more features.",
    });
  }
});

//login failed
router.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Login Failed");
});

// logout
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false, // set secure to false
      sameSite: "strict",
    });
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: false, // set secure to false
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Logged Out Successfully",
    });
  });
});

export default router;
