
import React from "react";
import { Link } from "react-router-dom";
import "./Title.css";
import logo from "../../../Media/Mercado-Libre-Logo.png";

const Title = () => {
  return (
    <div className="Title-Container">
      <Link to="/">
        <img className="Title-Logo" src={logo} alt="Online Store" />
        <h1 className="Title">free market</h1>
      </Link>
    </div>
  );
};

export default Title;
