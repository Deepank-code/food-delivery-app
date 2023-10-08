import React, { useEffect, useRef, useState } from "react";
import "./UpdateProfile.css";
import { Link, useNavigate } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";
import "./UpdatePassword.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  loaduser,
  updatePassword,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import {
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
} from "../../constant/userConstant";

const UpdatePassword = () => {
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
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Your profile is successfully updated");
      dispatch(loaduser());
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, loading, error, navigate, user, isUpdated]);

  return (
    <>
      {loading ? (
        <div className="while-loading">
          <Loader />
        </div>
      ) : (
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2>Update Password</h2>

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
                  placeholder="Enter your old password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="newPassword">
                <PasswordIcon />
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
                <PasswordIcon />
                <input
                  type="password"
                  required
                  name="confirmPassword"
                  placeholder="confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                className="updatePasswordBtn "
                value="Change password"
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
