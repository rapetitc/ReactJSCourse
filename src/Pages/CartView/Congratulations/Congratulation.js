import React, { useEffect, useContext } from "react";
import "./Congratulation.css";

import CartCounterContext from "../../../Context/CartCounter";

const Congratulation = ({ orderNumber }) => {
  const { updatingCart } = useContext(CartCounterContext);

  useEffect(() => {
    updatingCart([]);
  }, []);

  return (
    <div className="Congratulation_Container container">
      <h4>Congratulation!</h4>
      <p>Tu numero de orden es: {orderNumber}</p>
    </div>
  );
};

export default Congratulation;
