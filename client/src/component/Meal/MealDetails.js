import React, { useEffect } from "react";
import Caurosel from "react-material-ui-carousel";
import { getMealDetail } from "../../actions/mealAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./mealDetail.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
const MealDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { meal, loading, error } = useSelector((state) => state.mealDetail);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 15 : 25,
    activeColor: "tomato",
    value: meal.ratings,
    isHalf: true,
  };
  useEffect(() => {
    dispatch(getMealDetail(id));
    console.log(meal);
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <div className="while-loading">
          <Loader />
        </div>
      ) : (
        <>
          <div className="meal-details">
            <div className="images-div">
              <Caurosel>
                {meal.images &&
                  meal.images.map((item, i) => {
                    return (
                      <img
                        className="meal-img"
                        src={item.secure_url}
                        alt={`${i} side`}
                        key={item.secure_url}
                      />
                    );
                  })}
              </Caurosel>
            </div>
            <div>
              <div className="details-block1">
                <h2>{meal.name}</h2>
                <p>Meal #{meal._id}</p>
              </div>
              <div className="details-block2">
                <ReactStars {...options} />
                <span>{meal.noofReviews} Reviews</span>
              </div>
              <div className="details-block3">
                <h1>RS {meal.price}</h1>
                <div className="details-block3-1">
                  <div className="details-block3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b className={meal.Stock < 1 ? "redColor" : "greenColor"}>
                    {meal.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{meal.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewHeading">Reviews</h3>

          {meal.reviews && meal.reviews[0] ? (
            <div className="reviews">
              {meal.reviews &&
                meal.reviews.map((review) => {
                  return <ReviewCard review={review} />;
                })}
            </div>
          ) : (
            <p className="noreviews">No Reviews Yet!!</p>
          )}
        </>
      )}
    </>
  );
};

export default MealDetails;
