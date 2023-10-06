import React, { useEffect, useRef, useState } from "react";
import "./Loginsignup.css";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { login, register, clearErrors } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const LoginSignup = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      fullName: name,
      email: email,
      password: password,
      avatar: avatar,
    };
    console.log(myForm);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, loading, navigate, error]);

  return (
    <>
      {loading ? (
        <div className="while-loading">
          <Loader />
        </div>
      ) : (
        <div className="loginSignupContainer">
          <div className="loginSignupBox">
            <div>
              <div className="login_signup_toggle">
                <p
                  onClick={(e) => {
                    switchTab(e, "login");
                  }}
                >
                  Login
                </p>
                <p
                  onClick={(e) => {
                    switchTab(e, "register");
                  }}
                >
                  Register Here
                </p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <EmailIcon />
                <input
                  type="email"
                  required
                  placeholder="email@test.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <PasswordIcon />
                <input
                  type="password"
                  placeholder="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Link to="/password/forgot">Forget Password?</Link>
              <input type="submit" value="login" className="loginBtn" />
            </form>
            <form
              className="signupForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signupName">
                <AccountCircleIcon />
                <input
                  type="text"
                  required
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signupEmail">
                <EmailIcon />
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="email@test.com"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signupPassword">
                <PasswordIcon />
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <div className="registerImg">
                <img src={avatarPreview} alt="avatar-preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                className="signUpBtn"
                value="register"
                disabled={loading ? true : false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
