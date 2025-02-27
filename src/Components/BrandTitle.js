import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/Mercado-Libre-Logo.png";

const BrandTitle = () => {
  return (
    <Link to="/" className="flex items-center gap-4 w-max mx-5">
      <div className="flex items-center size-16">
        <img src={logo} alt="Online Store" />
      </div>
      <h1 className="text-2xl">Online Store</h1>
    </Link>
  );
};

export default BrandTitle;
