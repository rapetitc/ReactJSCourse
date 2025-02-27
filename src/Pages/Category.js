import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Category = () => {
  //TODO
  const { id } = useParams();

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <h1>Aqui ira Categoria {id}</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
