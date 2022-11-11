import React from "react";

const Congratulation = ({ orderNumber }) => {
  return (
    <div>
      <h4>Congratulation</h4>
      <p>Tu numero de orden es: {orderNumber}</p>
    </div>
  );
};

export default Congratulation;
