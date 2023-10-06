import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name is required"],
      minLength: [5, "name should be minimum 5 character"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required field"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required field"],
      select: false,
      minLength: [6, "password should be min 6 char"],
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  generateJWTToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        name: this.fullName,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  generatePasswordresetToken: async function () {
    //creating random bytes token
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.forgetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000; //15 min from now

    return resetToken;
  },
};

const User = new model("User", userSchema);
export default User;
