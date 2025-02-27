import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchFor, setSearchFor] = useState("");
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?t=${searchFor}`);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handlingSubmit}
        className="flex content-center gap-1 w-full py-2 px-3 my-2 rounded bg-white overflow-hidden"
      >
        <input
          type="search"
          className="w-[calc(100%-24px)] outline-none"
          onKeyUp={(e) => {
            // TODO evaluar solo texto y numero
            setSearchFor(e.target.value);
          }}
          placeholder="Buscar productos, marcas y mas..."
        />
        <button className="cursor-pointer">
          <svg fill="currentColor" className="size-6" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
