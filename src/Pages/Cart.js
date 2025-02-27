import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartContext from "../Context/CartContext";

const Cart = () => {
  const { cart, detailedCart, getDetailedCart, handlingPay } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  const handler = async () => {
    await getDetailedCart();
    setIsLoading(false);
  };

  useEffect(() => {
    if (cart !== null) {
      handler();
    }
  }, []);

  return (
    <div className="flex flex-wrap content-between min-h-[100vh]">
      <div className="w-full">
        <NavBar />
        <div className="w-[1280px] mx-auto">
          <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
            <h3 className="text-2xl">Carrito de compras</h3>
          </div>
          {cart === null || cart?.products?.length == 0 ? (
            <div className="text-center">
              <p>El carrito de compras está vacío</p>
            </div>
          ) : isLoading ? (
            "Esta cargando"
          ) : (
            <div className="flex gap-10 py-2">
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
                  {detailedCart.products.map((prod, i) => {
                    return (
                      <tr
                        className={
                          i % 2 == 0 ? "bg-yellow-100" : "bg-yellow-200"
                        }
                        key={i}
                      >
                        <td className="p-1 ">
                          <Link to={`/product/${prod.id}`}>
                            {prod.brand} {prod.title}
                          </Link>
                        </td>
                        <td className="p-1 ">{prod.quantity}</td>
                        <td className="p-1 ">${prod.price}</td>
                        <td className="p-1 ">${prod.price * prod.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex flex-col items-center gap-4 w-[300px] p-5 rounded bg-gray-100">
                <p className="text-lg">
                  Total a pagar:{" "}
                  <span className="font-semibold">
                    ${detailedCart.total_price}
                  </span>
                </p>
                <button
                  className="w-full py-2 px-4 rounded bg-blue-400 cursor-pointer"
                  onClick={() => {
                    handlingPay();
                  }}
                >
                  Pagar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
