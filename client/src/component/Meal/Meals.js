import React, { useEffect, useState } from "react";
import { getMeals } from "../../actions/mealAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Meal from "../Home/Meal";
import Pagination from "@mui/material/Pagination";
import { Slider, Typography } from "@mui/material";
import "./Meals.css";
import { useParams } from "react-router-dom";

const categories = [
  "Pizza",
  "Thali",
  "Chicken",
  "Biryani",
  "Panner",
  "Burger",
  "North Indian",
  "Momos",
  "Cake",
  "Dosa",
  "Rolls",
  "fast food",

  "Lunch/dinner",
];
const Meals = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState([20, 3000]);
  const [page, setPage] = React.useState(1);
  const [category, setCategory] = useState();
  const handleChange = (event, value) => {
    setPage(value);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const {
    loading,
    error,
    mealCount,
    meals,
    resultPerPage,
    filteredmealsCount,
  } = useSelector((state) => state.meals);
  const keyword = useParams();

  useEffect(() => {
    dispatch(getMeals(keyword.keyword, page, price, category));
  }, [dispatch, keyword.keyword, page, price, category]);
  let count = filteredmealsCount;
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
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={20}
              max={3000}
            />
            <Typography>Meals Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => {
                return (
                  <li
                    className="categories-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>
          </div>
          {resultPerPage && (
            <div className="pagination-box">
              <Pagination count={10} page={page} onChange={handleChange} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Meals;
