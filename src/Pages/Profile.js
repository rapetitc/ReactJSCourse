import React from "react";
import { Link } from "react-router-dom";

import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Profile = () => {
  //TODO Actualizar UI de Mis Compras y Productos Publicados

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
            <h3 className="text-2xl">Tu perfil</h3>
          </div>
          <div className="flex w-full p-5">
            <div className="w-full p-4">
              <div className="flex justify-between py-1 px-2">
                <h4 className="text-lg font-semibold">Productos publicados</h4>
                <Link to={"/sell"} className="px-1 hover:underline">
                  Vender
                </Link>
              </div>
              <table className="w-full bg-white">
                <thead className="">
                  <tr>
                    <td className="p-1 font-semibold">Producto</td>
                    <td className="p-1 font-semibold">Precio</td>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="bg-red-100">
                    <td className="p-1 ">
                      <Link>Zapatos</Link>
                    </td>
                    <td className="p-1 ">$150</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full p-4">
              <div className="flex justify-between py-1 px-2">
                <h4 className="text-lg font-semibold">Mis compras</h4>
              </div>
              <table className="w-full bg-white">
                <thead className="">
                  <tr>
                    <td className="p-1 font-semibold">Ticket</td>
                    <td className="p-1 font-semibold">Total pagado</td>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="bg-red-100">
                    <td className="p-1 ">
                      <Link>GYSGW459GTG912GOLAS25FU</Link>
                    </td>
                    <td className="p-1 ">$150</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
