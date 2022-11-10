import React from "react";
import "./Navbar.css";

import Title from "./Title/Title";
import SearchBar from "./SearchBar/SearchBar";
import SubscriptionNav from "./SubscriptionNav/SubscriptionNav";
import CompactMenu from "./CompactMenu/CompactMenu";
import MapNav from "./MapNav/MapNav";
import Menu from "./Menu/Menu";
import Profile from "./Profile/Profile";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

const NavBar = ({ UserName = "User" }) => {
  return (
    <header className="fluid-container NavBar_Container">
      <div className="container">
        <Title></Title>
        <SearchBar></SearchBar>
        <SubscriptionNav></SubscriptionNav>
        <CompactMenu></CompactMenu>
        <MapNav></MapNav>
        <Menu></Menu>
        <Profile shoppingcart={<ShoppingCart />}></Profile>
      </div>
    </header>
  );
};

export default NavBar;
