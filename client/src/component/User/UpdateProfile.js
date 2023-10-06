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
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constant/userConstant";
const UpdateProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      fullName: name,
      email: email,

      avatar: avatar,
    };
    console.log(myForm);
    dispatch(updateProfile(myForm));
  };
  const updateProfileChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
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

  return (
    <>
      {loading ? (
        <div className="while-loading">
          <Loader />
        </div>
      ) : (
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2>Update Profile</h2>

            <form
              className="updateForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateName">
                <AccountCircleIcon />
                <input
                  type="text"
                  required
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="updateEmail">
                <EmailIcon />
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="email@test.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="updateImg my-2">
                <img src={avatarPreview} alt="avatar-preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileChange}
                />
              </div>
              <input
                type="submit"
                className="updateBtn"
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

export default UpdateProfile;
