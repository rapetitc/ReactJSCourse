import React from "react";
import Title from "../Title/Title";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Menu from "../Menu/Menu";

const style = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
  },
  navGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const Navbar = ({ UserName = "User" }) => {
  return (
    <header style={style.container}>
      <Title></Title>
      <h2 style={style.welcome}>Bienvendio {UserName}</h2>
      <div style={style.navGroup}>
        <Menu></Menu>
        <ShoppingCart></ShoppingCart>
      </div>
    </header>
  );
};

export default Navbar;
