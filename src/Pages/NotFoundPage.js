import React from "react";
import { Link } from "react-router-dom";

import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

const NotFoundPage = () => {
  // TODO Mejorar UI

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <div className="flex justify-center items-center h-[800px]">
            <div className="text-center">
              <h2 className="mt-2 mb-3 text-4xl">Opps!, Error 404.</h2>
              <h3 className="text-xl">No encontramos esta direccion</h3>
              <Link to={"/"} className="text-lg">
                Volver a la pagina principal
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
