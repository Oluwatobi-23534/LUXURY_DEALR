import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error(" Invalid email or password");
  }
});


const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, authMethod } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const user = await User.create({ username, email, password, authMethod });

  if (user) {
    generateToken(res, user._id);
    res.status(201);
    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid User Credentials!");
  }
});


const updateUserprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.username = req.body.name || user.username; // change this line
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.username, // and this line
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});


const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("connect.sid", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged Out Successfully",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  const resetToken = user.createPasswordResetToken();
  await user.save(); // await the save operation

  const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetToken}}`;

  const message = `Forgot Password? Click here to reset your password!: ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token. (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      message: "Yay! We've sent a token to your email!",
    });

  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save(); // await the save operation
    console.log(error);

    res.status(500).json({
      // use res instead of response
      status: "error",
      message: "There was an error sending the email. Please try again later!",
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Token is invalid or expired!",
    });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();

  generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.json(users);
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    await user.save()
    
    res.json({message: "User updated successfully"})
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})




export {
  loginUser,
  registerUser,
  updateUserprofile,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUser,
  getUsers,
  updateUser,
};
