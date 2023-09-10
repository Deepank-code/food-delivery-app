import React from "react";
import "./Home.css";
import FeatureSection from "./FeatureSection";
import AboutComp from "./AboutComp";
import OurMenu from "./OurMenu";
export const Home = () => {
  return (
    <>
      <div id="parent-home-div">
        <div className="banner ">
          <div className="left-section">
            <p id="first-para">More Faster</p>
            <h2>
              Be The Fastest In Delivering Your <span>Food</span>
            </h2>
            <p>
              <b>
                Our job is to filling your tummy with delicious food and with
                fast and free delivery
              </b>
            </p>
            <a href="#" className="get-started-btn">
              Get Started
            </a>
          </div>
          <div className="right-section">
            <img
              className="clock_icon"
              src={require("../../asserts/images/clock.png")}
              alt="clock"
            />
            <div className="parent-img-div">
              <img
                className="bg-icon"
                src={require("../../asserts/images/bg-circle.png")}
              />{" "}
              <img
                className="eating-girl"
                src={require("../../asserts/images/eating-girl.png")}
              />
              <img
                className="pizza-widzet"
                src={require("../../asserts/images/pizza-wid.png")}
              />
            </div>

            <img
              className="arrow-icon"
              src={require("../../asserts/images/arrow.png")}
            />
          </div>
        </div>
        <FeatureSection />
        <OurMenu />
        <AboutComp />
      </div>
    </>
  );
};
