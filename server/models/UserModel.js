import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authMethod: {
    type: String,
    required: true,
    enum: ["local", "google"], // 'local' for username/password, 'google' for Google auth
  },
  password: {
    type: String,
    required: function () {
      return this.authMethod === "local"; // Only require a password for local auth
    },
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10mins

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

export default User;
