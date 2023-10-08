import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./component/Home/Home.js";
import { useEffect } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import MealDetails from "./component/Meal/MealDetails";
import Meals from "../src/component/Meal/Meals.js";
import Search from "./component/Meal/Search";
import LoginSignup from "./component/User/LoginSignup";
import store from "./store";
import { loaduser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loaduser());
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
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
