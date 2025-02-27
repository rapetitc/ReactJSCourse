import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Ticket = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
            <h3 className="text-2xl">¡Gracias por tu compra!</h3>
            <p className="p-2">Ticket de compra: {id}</p>
          </div>
          <div>{/* TODO realizar body del ticket */}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ticket;
