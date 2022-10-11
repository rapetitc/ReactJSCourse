import React from "react";
import "./Navbar.css";
import Title from "../Title/Title";
import SearchBar from "../SearchBar/SearchBar";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Menu from "../Menu/Menu";
import Profile from "../Profile/Profile";

const Navbar = ({ UserName = "User" }) => {
  return (
    <header className="navbar-Container">
      <div>
        <Title></Title>
        <SearchBar></SearchBar>
        <Menu></Menu>
        <Profile UserName={UserName}></Profile>
        <ShoppingCart></ShoppingCart>
      </div>
    </header>
  );
};

export default Navbar;
