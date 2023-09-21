import React, { useEffect } from "react";
import { getMeals } from "../../actions/mealAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Meal from "../Home/Meal";
import "./Meals.css";
import { useParams } from "react-router-dom";

const Meals = () => {
  const dispatch = useDispatch();
  const { loading, error, mealCount, meals } = useSelector(
    (state) => state.meals
  );
  const keyword = useParams();
  useEffect(() => {
    dispatch(getMeals(keyword));
  }, [dispatch, keyword]);
  console.log(meals);
  return (
    <>
      {loading ? (
        <div className="while-loading">
          <Loader />
        </div>
      ) : (
        <>
          <h2 className="mealsHeading">Meal</h2>
          <div className="meals">
            {meals &&
              meals.map((meal) => {
                return <Meal key={meal._id} meal={meal} />;
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Meals;
