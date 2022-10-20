import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="searchBar-Container">
      <div>
        <input type={"search"} className="searchBar-Input" placeholder="Buscar productos, marcas y mas..." />
        <button className="searchBar-Button">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
