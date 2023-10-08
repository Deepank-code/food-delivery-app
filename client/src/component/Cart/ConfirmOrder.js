import React, { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import CheckoutSteps from "./CheckOutSteps";
import { useAlert } from "react-alert";

const cuponsCode = ["Q23RPD", "P23GRS", "hello"];

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [cupon, setCupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges - discount;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };
  const canAvailDiscount = (cupon) => {
    if (cuponsCode.includes(cupon)) {
      let discountAmount = subtotal * (15 / 100);
      setDiscount(discountAmount);
      alert.success("Congrats! you got 15% discount");
    }
    setDiscount(0);
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} =
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="cuponCode">
            <Typography>Cupon Code</Typography>
            <div>
              <input
                type="text"
                value={cupon}
                min="6"
                onChange={(e) => setCupon(e.target.value)}
              />
              <button onClick={() => canAvailDiscount(cupon)}>
                Avail Discount
              </button>
            </div>
            {discount ? (
              <p
                className="discountpara"
                style={{
                  fontSize: "0.7em",
                  textAlign: "start",
                  padding: "0.5em 0 2em 1em",
                }}
              >
                congratulation!! you got flat 15% off on meals
              </p>
            ) : (
              <p
                style={{
                  fontSize: "0.7em",
                  textAlign: "start",
                  padding: "0.5em 0 2em 1em",
                }}
              >
                cupon code for 15% off
              </p>
            )}
          </div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
              <div>
                <p>Discount(15% off)</p>
                <span>₹{discount}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
