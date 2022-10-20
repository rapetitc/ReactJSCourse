import React from "react";
import { Link } from "react-router-dom";
import './ShoppingCart.css'

const ShoppingCart = () => {
  return (
    <div className="shoppingCart-Container">
      <Link to='/cart' type="button" className="shoppingCart">
        <i className="bi bi-cart2"></i>
      </Link>
    </div>
  );
};

export default ShoppingCart;
