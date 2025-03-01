import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import SessionContext from "../Context/SessionContext";
import CartContext from "../Context/CartContext";

const Cart = () => {
  const { session } = useContext(SessionContext);
  const { cart, detailedCart, getDetailedCart, handlingPay } =
    useContext(CartContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const handler = async () => {
    await getDetailedCart();
    setIsLoaded(true);
  };

  useEffect(() => {
    if (cart !== null) {
      handler();
    }
  }, []);

  return (
    <div className="w-[1280px] mx-auto">
      <div className="flex flex-col p-4 my-5 rounded-lg bg-gray-200">
        <h3 className="text-2xl">Carrito de compras</h3>
      </div>

      {isLoaded ? (
        cart === null || cart?.products?.length == 0 ? (
          <div className="flex justify-center p-1">
            <p>Carrito vacio</p>
          </div>
        ) : (
          <div className="flex gap-10 py-2">
            <table className="w-full h-max rounded-lg bg-white overflow-hidden">
              <thead>
                <tr>
                  <td className="ps-15 p-2 font-semibold">Producto</td>
                  <td className="p-2 text-center font-semibold">Cantidad</td>
                  <td className="p-2 text-center font-semibold">Precio</td>
                  <td className="p-2 text-center font-semibold">Total</td>
                </tr>
              </thead>
              <tbody>
                {detailedCart.products.map((prod, i) => {
                  return (
                    <tr
                      className={i % 2 == 0 ? "bg-yellow-100" : "bg-yellow-200"}
                      key={i}
                    >
                      <td className="p-1">
                        <Link
                          to={`/product/${prod.id}`}
                          className="flex items-center gap-3 p-1 text-lg font-semibold"
                        >
                          <div className="flex justify-center items-center size-10 rounded bg-white  overflow-hidden">
                            <img
                              src={prod.images[0]}
                              className="max-w-full max-h-full"
                            />
                          </div>
                          <p>{prod.title}</p>
                        </Link>
                      </td>
                      <td className="p-1 text-center">{prod.quantity}</td>
                      <td className="p-1 text-center">${prod.price}</td>
                      <td className="p-1 text-center">
                        ${prod.price * prod.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex flex-col items-center gap-4 w-[300px] h-max p-5 rounded bg-gray-100">
              {session != null ? (
                <>
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
                </>
              ) : (
                <div className="text-center">
                  <p>Antes de completar</p>
                  <Link to={"/login"} className="hover:underline">
                    Iniciar sesion
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <p className="text-center">Cargando. . . </p>
      )}
    </div>
  );
};

export default Cart;
