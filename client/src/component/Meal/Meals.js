import React, { useEffect } from "react";
import { getMeals } from "../../actions/mealAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";

const Meals = () => {
  const dispatch = useDispatch();

  const { meals, loading, error, mealCount } = useSelector(
    (state) => state.meals
  );
  console.log(meals);
  useEffect(() => {
    dispatch(getMeals);
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mealsHeading">Meal</h2>
          <div className="meals">
            {meals &&
              meals.map((meal) => {
                <Meals key={meal._id} meal={meal} />;
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Meals;
