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

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  });
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/food/meal/:id" Component={MealDetails} />
          <Route exact path="/meals" Component={Meals} />
          <Route path="/meals/:keyword" Component={Meals} />

          <Route exact path="/search" Component={Search} />
          <Route exact path="login" Component={LoginSignup} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
