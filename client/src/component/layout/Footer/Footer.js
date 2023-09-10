import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="my-5" id="footer ">
      <div className="footer-container d-flex justify-content-around align-items-center">
        <div className="section-1">
          <div className="d-flex">
            <img
              className="footer-comp-img me-3"
              src="https://w7.pngwing.com/pngs/894/279/png-transparent-online-food-ordering-food-delivery-grubhub-others-food-service-logo-thumbnail.png"
            />
            <h6 className="footer-comp-name">Let's Eat</h6>
          </div>

          <div className="footer-para">
            <p>
              Our job is to filling your tummy with delicious food and with fast
              and free delivery.
            </p>
          </div>
          <div className="logo-section"></div>
        </div>
        <div className="section-2">
          <b>About</b>
          <ul className="footer-list">
            <li>
              <a>About us</a>
            </li>
            <li>
              <a>Features News</a>
            </li>
            <li>
              <a>News</a>
            </li>
            <li>
              <a>updates</a>
            </li>
          </ul>
        </div>
        <div className="section-3">
          <b>Company</b>
          <ul className="footer-list">
            <li>
              <a>Why Let's eat</a>
            </li>
            <li>
              <a>Partner with us!</a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>Blogs</a>
            </li>
          </ul>
        </div>
        <div className="section-4">
          <b>Support</b>
          <ul className="footer-list">
            <li>
              <a>Support center</a>
            </li>
            <li>
              <a>Feedback</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
            <li>
              <a>Accessiblity</a>
            </li>
          </ul>
        </div>
        <div className="section-5">
          <b>Get in Touch</b>
          <div className="footer-para">
            <p>
              Question or feedback?
              <br />
              We’d love to hear from you
            </p>
          </div>
          <a href="#">Send us Email</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
