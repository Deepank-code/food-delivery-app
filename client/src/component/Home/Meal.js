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
    value: 2.5,
    isHalf: true,
  };
  return (
    <Link className="mealCard" to="{meal._id}">
      <img
        src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chan-walrus-958545.jpg&fm=jpg"
        width="200px"
        alt="{meal.name}"
      />
      <p>Birayani</p>
      <div>
        <ReactStars {...options} />
        <span>544 reviews</span>
      </div>
      <span>3242</span>
    </Link>
  );
};

export default Meal;
