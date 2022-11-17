import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./MainCartView.css";

import CartCounterContext from "../../../Context/CartCounter";

const MainCartView = ({ fullCart, totalPrice, totalQty }) => {
  const { removeItemFromCart } = useContext(CartCounterContext);


  return (
    <div className="MainCartView_Container">
      <h2>Carrito de compras</h2>
      <div className="stack-group">
        {fullCart.length > 0 ? (
          <>
            <div className="stack-header">
              <button
                className="link"
                onClick={() => {
                  removeItemFromCart("*");
                }}
              >
                Eliminar todos
              </button>
            </div>
            {fullCart.map((product, i) => {
              return (
                <div className="stack" key={i}>
                  <div className="stack-img">
                    <img src={product.images[0]} alt={product.title} />
                  </div>
                  <div className="stack-description">
                    <h2>{product.tittle}</h2>
                    <p>{product.description}</p>
                    <div className="stack-description-buttons">
                      <button
                        className="link"
                        onClick={() => {
                          removeItemFromCart(product.id);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="stack-details">
                    <p>
                      Precio: <span>${product.price}</span>
                    </p>
                    <p>
                      Descuento: <span>${product.discount}</span>
                    </p>
                    <p>
                      Impuesto: <span>{product.taxes}%</span>
                    </p>
                    <p>
                      Precio Total Unitario: <span>${product.totalunitprice}</span>
                    </p>
                    <p>
                      Cantidad: <span>{product.quantity}</span>
                    </p>
                    <p>
                      Precio total: <span>${product.totalunitprice * product.quantity}</span>
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="stack-footer">
              <div>
                <p>
                  Total articulos: <span>{totalQty}</span>
                </p>
                <p>
                  Total a pagar: <span>${totalPrice}</span>
                </p>
                <Link to={"/cart/checkout"} className="btn">
                  Proceder a paga
                </Link>
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

export default MainCartView;
