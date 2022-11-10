import React, { useContext, useEffect, useState } from "react";
import "./CartView.css";

import CartCounterContext from "../../Context/CartCounter";
import { Link } from "react-router-dom";

const CartView = () => {
  const [tempCart, setTempCart] = useState([]);

  const { cart, getData } = useContext(CartCounterContext);

  useEffect(() => {
    const call = async () => {
      setTempCart(await getData(cart));
    };
    call();
  }, [cart, getData]);

  return (
    <div className="CartView_Container container">
      <h2>Carrito de compras</h2>
      <div className="stack-group">
        {tempCart.length > 0 ? (
          <>
            <div className="stack-buttons-top" key={"stack-buttons-top"}>
              <button>Eliminar todos</button>
              <button>Eliminar seleccionados</button>
            </div>
            {tempCart.map((product, i) => {
              return (
                <div className="stack" key={i}>
                  <div className="stack-img-group">
                    <input type={"checkbox"} />
                    <div className="stack-img">
                      <img src={product.images[0]} alt={product.title} />
                    </div>
                  </div>
                  <div className="stack-description">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <div className="stack-description-buttons">
                      <button>Eliminar</button>
                    </div>
                  </div>
                  <div className="stack-details">
                    <p>
                      Precio: <span>${product.price}</span>
                    </p>
                    <p>
                      Descuento: <span>${product.price}</span>
                    </p>
                    <p>
                      Impuesto: <span>${product.price}</span>
                    </p>
                    <p>
                      Precio Total Unitario: <span>${product.price}</span>
                    </p>
                    <p>
                      Cantidad: <span>5</span>
                    </p>
                    <p>
                      Precio total: <span>${product.price}</span>
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="stack-buttons-bottom" key={"stack-buttons-bottom"}>
              <div>
                <p>
                  Total a pagar: <span>$0</span>
                </p>
                <Link to={"/cart/checkout"}>Proceder a paga</Link>
              </div>
            </div>
          </>
        ) : (
          <p>Carrito Vacio</p>
        )}
      </div>
    </div>
  );
};

export default CartView;
