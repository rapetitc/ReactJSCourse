import React from "react";
const style = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};
const ShoppingCart = () => {
  return (
    <div style={style.container}>
      <button type="button" className="btn btn-outline-secondary">
        <i className="bi bi-cart3"></i>
      </button>
    </div>
  );
};

export default ShoppingCart;
