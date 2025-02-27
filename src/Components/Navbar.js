import React from "react";

import BrandTitle from "./BrandTitle";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import ProfileNav from "./ProfileNav";
import ShoppingCart from "./ShoppingCart";

const NavBar = () => {
  return (
    <header className="bg-yellow-200">
      <div className="grid grid-cols-12 items-end w-[1280px] mx-auto">
        <div className="col-span-3 flex justify-end">
          <BrandTitle />
        </div>
        <div className="col-span-6">
          <SearchBar />
        </div>
        <div className="col-start-4 col-span-5 self-center">
          <Menu />
        </div>
        <div className="col-span-4 flex justify-end items-center gap-6 min-w-max py-1 mx-4">
          <ProfileNav />
          <ShoppingCart />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
