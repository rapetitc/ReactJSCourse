import { useState, useContext } from "react";

import CartContext from "../Context/CartContext";

// FIXME Impedir agregar producto publicado por el mismo usuario logueado
const CartButtons = ({ product_id, stock }) => {
  const { isItemInCart, updateItemInCart } = useContext(CartContext);
  const isItemInCart_ = isItemInCart(product_id);

  const [counter, setCounter] = useState(isItemInCart_ || 1);
  const [itemQuantity, setItemQuantity] = useState(isItemInCart_ || 0);

  const handlingOnChange = (e) => {
    const { value } = e.target;

    if (!Number.isNaN(Number(value)))
      setCounter(value > stock ? stock : Number(value));
  };

  const handlingOnBlur = (e) => {
    const { value } = e.target;
    if (value.length == 0) setCounter(0);
  };

  const handlingItemQuantity = async (action) => {
    if (action) {
      setItemQuantity(counter);
      await updateItemInCart(product_id, counter);
    } else {
      setCounter(0);
      setItemQuantity(0);
      await updateItemInCart(product_id, 0);
    }
  };

  return (
    <div className=" p-1 my-3">
      <p className="p-1 text-xs text-gray-900">
        Disponibilidad de{" "}
        <span className="font-semibold">{stock} unidades</span>
      </p>
      <div className="flex gap-2 p-1">
        <p className="">Cantidad:</p>
        <div className="flex gap-2">
          <button
            className="flex justify-center items-center w-full rounded bg-white cursor-pointer"
            onClick={() => {
              if (counter > 1) return setCounter(counter - 1);
              setCounter(0);
            }}
          >
            <svg fill="currentColor" className="size-5" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>
          </button>
          <input
            className="w-full text-center rounded bg-white outline-none"
            type="text"
            value={counter}
            onChange={handlingOnChange}
            onBlur={handlingOnBlur}
          />
          <button
            className="flex justify-center items-center w-full rounded bg-white cursor-pointer"
            onClick={() => {
              if (counter < stock) return setCounter(counter + 1);
              setCounter(stock);
            }}
          >
            <svg fill="currentColor" className="size-5" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex gap-2 p-1 mt-1">
        {itemQuantity > 0 ? (
          <button
            className="w-max py-2 px-3 text-center text-gray-700 rounded bg-gray-200 cursor-pointer"
            onClick={() => {
              handlingItemQuantity(false);
            }}
          >
            <svg fill="currentColor" className="size-5" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
            </svg>
          </button>
        ) : null}
        <button
          className="w-full p-2 text-center rounded bg-blue-400 cursor-pointer disabled:bg-gray-400"
          onClick={() => {
            handlingItemQuantity(true);
          }}
          disabled={counter == 0 || counter == itemQuantity}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default CartButtons;
