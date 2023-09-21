import Meal from "../models/meal.model.js";
import AppError from "../utils/error.util.js";
import ApiFeatures from "../utils/apifeatures.js";

const getAllMeals = async (req, res, next) => {
  const resultPerPage = 10;
  const mealCount = await Meal.countDocuments();
  const apifeatures = new ApiFeatures(Meal.find({}), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const allMeals = await apifeatures.query;

  res.status(200).json({
    success: true,
    message: "All Meals are successfully found",
    allMeals,
    mealCount,
  });
};

//admin
const createMeal = async (req, res, next) => {
  req.body.user = req.user.id;
  const meal = await Meal.create(req.body);
  if (!meal) {
    return next(new AppError("someting went wrong on creating meal", 402));
  }

  res.status(200).json({
    success: true,
    message: "Meal",
    meal,
  });
};
//admin
const updateMeal = async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findById(id);
  if (!meal) {
    return next(new AppError("Meal with given id is not in the database", 402));
  }
  const updatedMeal = await Meal.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Meal updated successfully",
    updatedMeal,
  });
};

const deleteMeal = async (req, res, next) => {
  const { id } = req.params;

  const mealExist = await Meal.findById(id);
  if (!mealExist) {
    return next(new AppError("Meal with given id is not in the database", 402));
  }
  const deletedMeal = await Meal.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Meal deleted successfully",
    deletedMeal,
  });
};

//get meal detail
const getMealDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const meal = await Meal.findById(id);
    if (!meal) {
      return next(
        new AppError("Meal with given id is not in the database", 402)
      );
    }

    res.status(200).json({
      success: true,
      message: "Meal fetched successfully",
      meal,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
//create or update review
const createMealReview = async (req, res, next) => {
  const { rating, comment, mealid } = req.body;
  console.log(req.user);
  try {
    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const meal = await Meal.findById(mealid);

    const isReviewed = meal.reviews.find(
      (rev) => rev.user.toString() === req.user.id.toString()
    );

    if (isReviewed) {
      meal.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      meal.reviews.push(review);
      meal.numOfReviews = meal.reviews.length;
    }

    let avg = 0;

    meal.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    meal.ratings = avg / meal.reviews.length;

    await meal.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Review is successfully added!!",
      review,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
//getAll meal reviews
const getAllMealReviews = async (req, res, next) => {
  const { id } = req.query;
  const meal = await Meal.findById(id);

  if (!meal) {
    return next(new AppError("Meal not found", 402));
  }

  res.status(200).json({
    success: true,
    reviews: meal.reviews,
  });
};

//delete meal reviews

const deleteReview = async (req, res, next) => {
  const meal = await Meal.findById(req.query.mealId);

  if (!meal) {
    return next(new AppError("Meal not found", 402));
  }

  const reviews = meal.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const numOfReviews = reviews.length;

  await Meal.findByIdAndUpdate(
    req.query.mealId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "review successfully deleted!!",
  });
};

export {
  getAllMeals,
  createMeal,
  updateMeal,
  deleteMeal,
  getMealDetails,
  createMealReview,
  getAllMealReviews,
  deleteReview,
};
