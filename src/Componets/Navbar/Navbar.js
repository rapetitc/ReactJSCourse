import React from "react";
import "./Navbar.css";
import Title from "./Title/Title";
import SearchBar from "./SearchBar/SearchBar";
import SubscriptionNav from "./SubscriptionNav/SubscriptionNav";
import MapNav from "./MapNav/MapNav";
import Menu from "./Menu/Menu";
import Profile from "./Profile/Profile";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

const Navbar = ({ UserName = "User" }) => {
  return (
    <header className="navbar-Container">
      <div>
        <Title></Title>
        <SearchBar></SearchBar>
        <SubscriptionNav></SubscriptionNav>
        <MapNav></MapNav>
        <Menu></Menu>
        <div style={{width:'35%', display:'flex'}}>
          <Profile UserName={UserName}></Profile>
          <ShoppingCart></ShoppingCart>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
