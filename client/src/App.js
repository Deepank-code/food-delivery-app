import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./component/Home/Home.js";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import MealDetails from "./component/Meal/MealDetails";
import Meals from "../src/component/Meal/Meals.js";
import Search from "./component/Meal/Search";
import LoginSignup from "./component/User/LoginSignup";
import store from "./store";
import { loaduser } from "./actions/userAction";

import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";

function App() {
  let stripePromise = loadStripe(
    "pk_test_51NzAUCSA0XfX2SAlsXWkAngzSQuPNkNGD84wyAhoC388hAKfHLZg0zHTnHajIIASBEqOiOgTMD1xRNHDfVa1DRlz00tiNdRrCZ"
  );

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loaduser());
  }, []);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {stripePromise && (
            <Route
              exact
              path="/process/payment"
              element={
                <ProtectedRoute>
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              }
            />
          )}
          <Route exact path="/" Component={Home} />
          <Route path="/meal/:id" Component={MealDetails} />
          <Route exact path="/meals" Component={Meals} />
          <Route path="/meals/:keyword" Component={Meals} />

          <Route exact path="/search" Component={Search} />
          <Route
            exact
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route exact path="/login" Component={LoginSignup} />
          <Route exact path="/profile/update" Component={UpdateProfile} />
          <Route
            exact
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
