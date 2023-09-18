import React, { useEffect } from "react";
import "./ourmenu.css";
import { getMeals } from "../../actions/mealAction";
import { useSelector, useDispatch } from "react-redux";
import Meal from "./Meal";
import Loader from "../layout/Loader/Loader";

const OurMenu = () => {
  const dispatch = useDispatch();
  const { loading, error, mealCount, meals } = useSelector(
    (state) => state.meals
  );
  useEffect(() => {
    dispatch(getMeals());
  }, [dispatch]);
  console.log(meals);
  return (
    <div className="our-menu">
      <h5 className="py-4 sm-heading">OUR MENU</h5>
      <h2 className="my-2">Menu That Always Makes You Fall In Love</h2>
      <div className="our-menu-child-div">
        <div className="left-scroll-section">
          <h5>
            <img
              className="sm-images"
              src={require("../../asserts/images/sm-burger.png")}
            />
            Burgers
          </h5>
          <h5>
            <img
              className="sm-images"
              src={require("../../asserts/images/sm-pizza.png")}
            />
            Pizza
          </h5>
          <h5>
            <img
              className="sm-images"
              src={require("../../asserts/images/sm-cakes.png")}
            />
            Cakes
          </h5>
          <h5>
            <img
              className="sm-images"
              src={require("../../asserts/images/sm-ramen.png")}
            />
            Ramen
          </h5>
          <h5>
            <img
              className="sm-images"
              src={require("../../asserts/images/sm-icecream.png")}
            />
            Ice-Cream
          </h5>
          <h5>
            <img
              className="sm-images"
              src={require("../../asserts/images/sm-pasta.png")}
            />
            Noodles
          </h5>
          <h5>
            <img
              className="sm-images"
              src={require("../../asserts/images/sm-taco.png")}
            />
            Tacos
          </h5>
          <h5>
            <img
              className="sm-images"
              src={require("../../asserts/images/sm-thali.png")}
            />
            Veg Thali
          </h5>
        </div>
        <div className="right-crousel-section">
          {loading ? (
            <Loader className="d-flex justify-content-center align-items-center" />
          ) : (
            meals &&
            meals.map((meal) => {
              return <Meal meal={meal} key={meal._id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
