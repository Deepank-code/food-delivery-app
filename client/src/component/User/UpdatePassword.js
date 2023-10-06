import React, { useEffect, useRef, useState } from "react";
import "./UpdateProfile.css";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import {
  register,
  clearErrors,
  loaduser,
  updateProfile,
  updatePassword,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constant/userConstant";

const alert = useAlert();
const dispatch = useDispatch();
const navigate = useNavigate();
const { loading, isUpdated, error } = useSelector((state) => state.profile);
const { user } = useSelector((state) => state.user);

const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setconfirmPassword] = useState("");

const updateProfileSubmit = (e) => {
  e.preventDefault();

  const myForm = {
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  console.log(myForm);
  dispatch(updatePassword(myForm));
};

useEffect(() => {
  if (user) {
    setName(user.fullName);
    setEmail(user.email);
    setAvatar(user.avatar.secure_url);
  }
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  if (isUpdated) {
    alert.success("Your profile is successfully updated");
    dispatch(loaduser());
    navigate("/account");
    dispatch({
      type: UPDATE_PROFILE_RESET,
    });
  }
}, [dispatch, loading, error, navigate, user, isUpdated]);
const UpdatePassword = () => {
  return (
    <>
      {loading ? (
        <div className="while-loading">
          <Loader />
        </div>
      ) : (
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2>Update Profile</h2>

            <form
              className="updateForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="oldPassword">
                <AccountCircleIcon />
                <input
                  type="password"
                  required
                  placeholder="Type your old password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="newPassword">
                <EmailIcon />
                <input
                  type="password"
                  required
                  name="newPassword"
                  placeholder="Enter your new Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="confirmPassword">
                <EmailIcon />
                <input
                  type="password"
                  required
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={email}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                className="updatepasswordBtn"
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

export default UpdatePassword;
