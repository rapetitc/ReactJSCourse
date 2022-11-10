import React from "react";
import "./CheckOutView.css";

const CheckOutView = () => {
  return (
    <div className="CheckOutView_Container container">
      <h1>Formulario de pago</h1>
      <form>
        <input type={"text"} placeholder="Nombre" />
        <input type={"text"} placeholder="Apellido" />
        <input type={"text"} placeholder="Direccion" />
      </form>
    </div>
  );
};

export default CheckOutView;
