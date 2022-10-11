import React from "react";
import "./Profile.css";

const Profile = ({ UserName }) => {
  return (
    <>
      <a href="$" className="profile-Link">
        Bienvenido <span>{UserName}</span> <i class="bi bi-chevron-down"></i>
      </a>
      <a href="$" className="profile-Link">Mis compras</a>
    </>
  );
};

export default Profile;
