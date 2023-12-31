import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <div className="logo-div">
          <Link className="navbar-brand " to="/">
            <img
              className="logo-img"
              src="https://w7.pngwing.com/pngs/894/279/png-transparent-online-food-ordering-food-delivery-grubhub-others-food-service-logo-thumbnail.png"
            />
          </Link>
          <h3>Let's Eat</h3>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <div className="links d-flex justify-content-space-between">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/meals">
                  Meals
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  My Cart
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  more..
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            {isAuthenticated ? (
              <UserOptions user={user} />
            ) : (
              <div className="buttons">
                <Link className="btn login-btn" to="/login">
                  <i className="fa-solid fa-right-to-bracket me-2"></i>Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
