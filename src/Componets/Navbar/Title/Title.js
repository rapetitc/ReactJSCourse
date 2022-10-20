
import React from "react";
import { Link } from "react-router-dom";
import "./Title.css";
import logo from "../../../Media/Mercado-Libre-Logo.png";

const Title = () => {
  return (
    <div className="title-Container">
      <Link to="/">
        <img className="title-Logo" src={logo} alt="Online Store" />
        <h1 className="title">online store</h1>
      </Link>
    </div>
  );
};

export default Title;
