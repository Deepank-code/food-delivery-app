import React, { useRef, useState } from "react";
import "./Loginsignup.css";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

import PasswordIcon from "@mui/icons-material/Password";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LoginSignup = () => {
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
  const loginSubmit = () => {
    console.log("formSubmited");
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set("name", name);
    formdata.set("email", email);
    formdata.set("password", password);
    formdata.set("avatar", avatar);
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
  return (
    <>
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
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signupEmail">
              <EmailIcon />
              <input
                type="email"
                required
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
                placeholder="email@test.com"
                value={email}
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
              // disabled={loading ? true : false}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
