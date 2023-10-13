import React from "react";
import "./cartitemcard.css";
import { Link } from "react-router-dom";


const CartItemsCard = ({ item, deleteCartItem }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} />
      <div>
        <Link to={`/meal/${item.product}`}>{item.name}</Link>
        <span>{`Price:$${item.price}`}</span>
        <p onClick={() => deleteCartItem(item.meal)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemsCard;
