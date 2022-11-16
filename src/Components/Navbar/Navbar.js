import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";

import Title from "./Title/Title";
import SearchBar from "./SearchBar/SearchBar";
import SubscriptionNav from "./SubscriptionNav/SubscriptionNav";
import MapNav from "./MapNav/MapNav";
import Menu from "./Menu/Menu";
import ProfileNav from "./ProfileNav/ProfileNav";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

import BehaviorsContext from "../../Context/Behaviors";

const NavBar = () => {
  const [closeMenu, setCompactMenu] = useState(false);

  const { outerWidth } = useContext(BehaviorsContext);

  const handlingCompactMenu = () => {
    if (closeMenu) {
      setCompactMenu(false);
    } else {
      setCompactMenu(true);
    }
  };

  useEffect(() => {
    if (outerWidth > 992) {
      setCompactMenu(false);
    }
  }, [outerWidth]);

  return (
    <header className="NavBar_Container fluid-container">
      <div className="container">
        <Title />
        <SearchBar />
        <SubscriptionNav />
        {outerWidth < 992 ? (
          <>
            <div className="CompactMenuButton_Container">
              <ShoppingCart />
              <button className="compactMenuButton" onClick={handlingCompactMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
            </div>
            <Menu closeMenu={closeMenu} outerWidth={outerWidth} />
          </>
        ) : null}
        <MapNav></MapNav>
        {outerWidth < 992 ? null : (
          <>
            <Menu></Menu>
            <ProfileNav />
            <ShoppingCart />
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
