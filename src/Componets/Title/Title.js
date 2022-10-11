import React from "react";
import "./Title.css"
import logo from "../../Media/Mercado-Libre-Logo.png";


const Title = () => {
  return (
    <div className="title-Container">
      <img className="title-Logo" src={logo} alt="Online Store" />
      <h1 className="title">online store</h1>
    </div>
  );
};

export default Title;
