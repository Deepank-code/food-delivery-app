import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  console.log(user);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <div>
      {loading ? (
        <div className="while-loading">
          <Loader />
        </div>
      ) : (
        <div className="profilecontainer my-4">
          <div>
            <h1>My Profile</h1>
            <img
              src={user.avatar && user.avatar.secure_url}
              alt={user.name}
              srcset=""
            />
            <Link to="/profile/update"> Edit profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.fullName}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Role</h4>
              <p>{user.role}</p>
            </div>
            <div>
              <h4>Joined on</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
            </div>
            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
