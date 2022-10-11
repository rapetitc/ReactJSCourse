import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <>
      <div className="searchBar_Container">
        <input type={"search"} className="searchBar_Input" placeholder="Buscar productos, marcas y mas..." />
        <button className="searchBar_Button">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </>
  );
};

export default SearchBar;
