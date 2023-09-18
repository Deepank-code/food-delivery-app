import { Router } from "express";
import {
  getAllMeals,
  createMeal,
  updateMeal,
  deleteMeal,
  getMealDetails,
  createMealReview,
  getAllMealReviews,
  deleteReview,
} from "../controllers/MealController.js";
import upload from "../middleware/multer.middleware.js";
import { isLoggedin, authorizedRoles } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/meals").get(getAllMeals);
router
  .route("/meal/new")
  .post(
    isLoggedin,
    upload.single("avatar"),
    authorizedRoles("ADMIN"),
    createMeal
  );
router
  .route("/meal/:id")
  .put(isLoggedin, authorizedRoles("ADMIN"), updateMeal)
  .delete(isLoggedin, authorizedRoles("ADMIN"), deleteMeal)
  // .get(isLoggedin, authorizedRoles("ADMIN"), getMealDetails);
  .get(getMealDetails);

router.route("/review").put(isLoggedin, createMealReview);

router
  .route("/reviews")
  .get(getAllMealReviews)
  .delete(isLoggedin, deleteReview);

export default router;
