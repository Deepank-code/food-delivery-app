import React from "react";
import "./Cart.css";
import CartItemsCard from "./CartItemsCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsToCart } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    const newq = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsToCart(id, newq));
  };
  const decreaseQuantity = (id, quantity, stock) => {
    if (quantity <= 1) return;
    const newq = quantity - 1;

    dispatch(addItemsToCart(id, newq));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemsToCart(id));
  };

  return (
    <div>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>SubTotal</p>
        </div>
        {cartItems &&
          cartItems.map((item) => {
            return (
              <div className="cartContainer" key={item.meal}>
                <CartItemsCard item={item} deleteCartItem={deleteCartItem} />

                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.meal, item.quantity, item.Stock)
                    }
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseQuantity(item.meal, item.quantity, item.Stock)
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartSubTotal">{`${
                  item.price * item.quantity
                }`}</p>
              </div>
            );
          })}
        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{`${cartItems.reduce((acc, item) => {
              return acc + item.quantity * item.price;
            }, 0)}`}</p>
          </div>
          <div></div>

          <div className="checkOutBtn">
            <button onClick={() => navigate("/shipping")}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
