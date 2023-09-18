import React from "react";
import profilepng from "../../images/profile.png";
import ReactStars from "react-rating-stars-component";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 15 : 25,
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
  };
  console.log(review);
  return (
    <div className="review_card">
      <img src={profilepng} alt="user" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
