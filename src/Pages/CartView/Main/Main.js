import React from "react";
import { Link } from "react-router-dom";

const Main = ({ tempCart, totalPrice, totalQty }) => {
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
                    <h1>{product.tittle}</h1>
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
            <div className="stack-buttons-bottom" key={"stack-buttons-bottom"}>
              <div>
                <p>
                  Total articulos: <span>{totalQty}</span>
                </p>
                <p>
                  Total a pagar: <span>${totalPrice}</span>
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

export default Main;
