import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

export const isLoggedin = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AppError("unautheticated user,Please login first"), 400);
  }
  //this will take out the payload from token saved in cookie
  const user_details = await jwt.verify(token, process.env.JWT_SECRET);
  //i have explicity save user details into user inside request it will take data to next /controller
  req.user = user_details;
  next();
};

export const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError("You do not have permission to access this route", 403)
      );
    }
    next();
  };
// export { isLoggedin, authorizedRoles };
//
