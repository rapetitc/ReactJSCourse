import React from "react";

import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchFor = searchParams.get("t");

  //TODO
  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <p>Buscando: {searchFor}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
