import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase_config";
import moment from "moment";

const Ticket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTicket = async () => {
    //TODO Si el ticket no existe redirigir hacia not found
    const result = await getDoc(doc(db, "tickets", id));
    setTicket(result.data());
    setIsLoading(false);
  };

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
            <h3 className="text-2xl">¡Gracias por tu compra!</h3>
          </div>
          <div>
            {/* TODO Mejorar el body del ticket */}
            {ticket == null ? (
              <h1>Cargando</h1>
            ) : (
              <>
                <div className="flex justify-between p-2 text-end">
                  <div>
                    <p className="p-2">Ticket de compra: {id}</p>
                  </div>
                  <div>
                    <p className="p-2">
                      Fecha y hora:{" "}
                      {moment(ticket.date).format("DD/MM/YYYY hh:mm:ss a")}
                    </p>
                  </div>
                </div>
                <table className="w-full h-max border border-gray-200 bg-white">
                  <thead className="">
                    <tr>
                      <td className="p-1 font-semibold">Producto</td>
                      <td className="p-1 font-semibold">Cantidad</td>
                      <td className="p-1 font-semibold">Precio</td>
                      <td className="p-1 font-semibold">Total</td>
                    </tr>
                  </thead>
                  <tbody className="">
                    {ticket.products.map((prod, i) => {
                      return (
                        <tr
                          className={
                            i % 2 == 0 ? "bg-yellow-100" : "bg-yellow-200"
                          }
                          key={i}
                        >
                          <td className="p-1 ">
                            {prod.brand} {prod.title}
                          </td>
                          <td className="p-1 ">{prod.quantity}</td>
                          <td className="p-1 ">${prod.price}</td>
                          <td className="p-1 ">
                            ${prod.price * prod.quantity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="p-5 text-end">
                  <p>Total pagado: ${ticket.total_price}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ticket;
