import React, { useState, useContext } from "react";
import "./CartButtons.css";

import CartCounterContext from "../../../Context/CartCounter";

const CartButtons = ({ id, itemQuantity, stock }) => {
  const [counter, setCounter] = useState(itemQuantity[0]);
  const [disableMinusButton, setDisableMinusButton] = useState(false);

  const { addItemToCart } = useContext(CartCounterContext);

  const handlingCounter = (value) => {
    if (value === +1 && counter < stock) {
      return setCounter(counter + 1);
    }
    if (value === -1 && counter > 0) {
      return setCounter(counter - 1);
    }
    return setDisableMinusButton(true);
  };

  const handlingAddCart = () => {
    addItemToCart(id, counter);
  };

  return (
    <div className="CartButtons_Container">
      <div className="btn-group">
        <button
          className="btn btn-color-t"
          onClick={() => {
            handlingCounter(-1);
          }}
          {...(disableMinusButton ? "disabled" : "")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
        </button>
        <input className="input" type="text" value={counter} readOnly />
        <button
          className="btn btn-color-t"
          onClick={() => {
            handlingCounter(+1);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      {counter === 0 && itemQuantity[1] ? (
        <button
          className="btn btn-color-t"
          onClick={() => {
            handlingAddCart();
          }}
        >
          Eliminar del carrito
        </button>
      ) : counter > 0 ? (
        <button
          className="btn btn-color-t"
          onClick={() => {
            handlingAddCart();
          }}
        >
          Agregar al carrito
        </button>
      ) : (
        <button
          className="btn btn-color-t"
          onClick={() => {
            handlingAddCart();
          }}
          disabled
        >
          Agregar al carrito
        </button>
      )}
    </div>
  );
};

export default CartButtons;
