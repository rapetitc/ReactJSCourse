import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ UserName }) => {
  return (
    <div className="profile-Container">
      <div>
        <Link to="/profile" className="profile-Link">
          Bienvenido <span>{UserName}</span> <i className="bi bi-chevron-down"></i>
        </Link>
        <Link to="/profile/purchases" className="profile-Link">
          Mis compras
        </Link>
      </div>
    </div>
  );
};

export default Profile;
