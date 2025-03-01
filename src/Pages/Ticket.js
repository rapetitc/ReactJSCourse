import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import moment from "moment";

import { db } from "../utils/firebase_config";

//TODO Mejorar UI
const Ticket = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  const getTicket = async () => {
    const result = await getDoc(doc(db, "tickets", id));
    if (result.exists()) {
      setTicket(result.data());
    } else {
      navigate("/not-found");
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <div className="w-[1280px] mx-auto">
      <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
        <h3 className="text-2xl">¡Gracias por tu compra!</h3>
      </div>
      <div>
        {ticket == null ? (
          <h1>Cargando</h1>
        ) : (
          <>
            <div className="flex justify-between p-2 text-end">
              <div>
                <p className="p-2">
                  Ticket de compra: <span className="font-semibold">{id}</span>
                </p>
              </div>
              <div>
                <p className="p-2">
                  Fecha y hora:{" "}
                  <span className="font-semibold">
                    {moment(ticket.date).format("DD/MM/YYYY hh:mm:ss a")}
                  </span>
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
                      className={i % 2 == 0 ? "bg-yellow-100" : "bg-yellow-200"}
                      key={i}
                    >
                      <td className="p-1 ">
                        {prod.brand} {prod.title}
                      </td>
                      <td className="p-1 ">{prod.quantity}</td>
                      <td className="p-1 ">${prod.price}</td>
                      <td className="p-1 ">${prod.price * prod.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="p-5 me-5 text-end">
              <p className="text-lg">
                Total pagado:{" "}
                <span className="text-xl font-semibold">
                  ${ticket.total_price}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Ticket;
