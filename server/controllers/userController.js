import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import fs from "fs";

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60,
  secure: true,
  httpOnly: true,
};

//register user
const registerUser = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !password || !email) {
    return next(new AppError("All fields are required", 400));
  }
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return next(new AppError("This email id is already registered", 400));
  }
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url: "",
    },
  });
  if (!user) {
    return next(
      new AppError("user registration failed please try again later", 401)
    );
  }
  //file upload
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // Remove file from server
        fs.rm(`uploads/${req.file.filename}`, (err) => {
          console.log(err);
        });
      }
    } catch (error) {
      return next(
        new AppError(error || "File not uploaded, please try again", 500)
      );
    }
  }

  await user.save();
  user.password = undefined;

  //for login i have to generate a token and save that into the cookie
  const token = await user.generateJWTToken();
  res.cookie("token", token, cookieOption);
  return res.status(200).json({
    success: true,
    message: "user is successfully created!!",
    user,
  });
};

//sign in user
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new AppError("All fields are required!!!", 401));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!(user && (await user.comparePassword(password)))) {
      return next(new AppError("Email and password does't match"), 400);
    }

    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

//logout user
const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({
      success: true,
      message: "User is successfully logout",
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
//getting user profile
const getProfile = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("User is not there in db !! try again", 400));
  }
  res.status(200).json({
    success: true,
    message: "User is found successfully!!",
    user,
  });
};

//implementing forget password
const forget = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Email field is required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Email is not registered", 400));
  }

  const resetToken = await user.generatePasswordresetToken();

  await user.save();

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  console.log(resetPasswordUrl);
  const subject = "Reset Password";

  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

  //sending email process
  try {
    await sendEmail(email, subject, message);
    res.status(200).json({
      success: true,
      message: `Reset password token has been successfully sent to ${email}`,
    });
  } catch (error) {
    user.forgetPasswordExpiry = undefined;
    user.forgetPasswordToken = undefined;
    await user.save();
    return next(new AppError(error.message, 500));
  }
};
const reset = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  if (!password) {
    next(new AppError("Please enter password you want to update", 500));
  }
  const forgetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgetPasswordToken,
    forgetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("token is invalid and expired ", 400));
  }

  user.password = password;
  user.forgetPasswordToken = undefined;
  user.forgetPasswordExpiry = undefined;

  user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};
//change password
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("Please enter your old and new password!!", 400));
  }

  const user = await User.findById(id).select("+password");
  if (!user) {
    return next(new AppError("user does't exist", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(new AppError("password does not match", 400));
  }

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new AppError("Old password is incorrect", 400));
  }

  user.password = newPassword;
  await user.save();
  user.password = undefined;
  res.status(200).json({
    success: true,
    message: "Password is successfully changed",
  });
};
//update user profile
const updateProfile = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("User does't exist", 403));
  }

  if (req.body.fullName) {
    user.fullName = req.body.fullName;
  }

  if (req.file) {
    //we need to destroy the the our prev image in cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "foodDeliveryapp",
        width: 200,
        height: 200,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // Remove file from server
        fs.rm(`uploads/${req.file.filename}`, (err) => {
          console.log(err);
        });
      }
    } catch (e) {
      return next(
        new AppError(e || "File not uploaded, please try again", 500)
      );
    }
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "User details updated successfully",
  });
};
//get all user --admin

const getAllUser = async (req, res, next) => {
  const allUser = await User.find({});

  if (!allUser) {
    return next(new AppError("There are no users in Database", 403));
  }

  res.status(200).json({
    success: true,
    message: "All users are successfully found ",
    allUser,
  });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User i not found in database", 403));
  }
  res.status(200).json({
    success: true,
    message: "user with given id is successfully retrived",
    user,
  });
};

//update user role-- admin
const updateUserRole = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("User does't exist", 403));
  }

  if (req.body.fullName) {
    user.fullName = req.body.fullName;
  }
  if (req.body.role) {
    user.role = req.body.role;
  }

  if (req.file) {
    //we need to destroy the the our prev image in cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "foodDeliveryapp",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // Remove file from server
        fs.rm(`uploads/${req.file.filename}`, (err) => {
          console.log(err);
        });
      }
    } catch (e) {
      return next(
        new AppError(e || "File not uploaded, please try again", 500)
      );
    }
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "User details updated successfully",
    user,
  });
};

//delete user admin
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return next(
      new AppError("User with given id is not present inside database", 403)
    );
  }
  if (req.file) {
    //we need to destroy the the our prev image in cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }
  res.status(200).json({
    success: true,
    message: "User with given id deleted successfully by admin",
  });
};

export {
  registerUser,
  signin,
  getProfile,
  forget,
  reset,
  changePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  logout,
};
