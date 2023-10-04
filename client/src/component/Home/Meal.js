import React from "react";
import "./Meal.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const Meal = ({ meal }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 15 : 25,
    activeColor: "tomato",
    value: meal.ratings,
    isHalf: true,
  };

  return (
    <Link className="mealCard" to={`/meal/${meal._id}`}>
      <img src={meal.images[0].secure_url} width="200px" alt="{meal.name}" />
      <p>{meal.name}</p>
      <div>
        <ReactStars {...options} />
        <span>{`${meal.reviews.length} reviews`}</span>
      </div>
      <span>{`RS ${meal.price}`}</span>
    </Link>
  );
};

export default Meal;
