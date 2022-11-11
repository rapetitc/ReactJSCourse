import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatorContext from "../../../Context/Authenticator";
import { isArrow, isRemoving, isTab } from "../../../utilities/utilities";
/* import CartCounterContext from "../../Context/CartCounter"; */
import "./CheckOutView.css";

const CheckOutView = ({ userInfo, setUserInfo }) => {
  const { token } = useContext(AuthenticatorContext);

  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setUserInfo({
      fname: form[0].value,
      lname: form[1].value,
      shippingadress: form[2].value,
      cardinfo: form[3].value,
      cardcode: form[4].value,
      cardexpdate: form[5].value,
    });
    navigate("/cart/confirmation");
  };

  const handlingName = (e) => {
    const key = e.key;
    const length = e.target.value.length;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (length > 25) {
      e.preventDefault();
    }
  };
  const handlingAddress = (e) => {
    const key = e.key;
    const length = e.target.value.length;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (length > 50) {
      e.preventDefault();
    }
  };
  const handlingCardInfo = (e) => {
    const key = e.key;
    const length = e.target.value.length;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (length >= 16 || isNaN(key)) {
      e.preventDefault();
    }
  };
  const handlingCard3Code = (e) => {
    const key = e.key;
    const length = e.target.value.length;

    if (isRemoving(key) || isArrow(key) || isTab(key)) {
      return true;
    }
    if (length >= 3 || isNaN(key)) {
      e.preventDefault();
    }
  };
  const handlingCardExpDate = (e) => {
    const key = e.key;
    console.log(key);
  };

  return (
    <div className="CheckOutView_Container container">
      <h3>Formulario de pago</h3>
      <p>Este es un simulador, solo intenta rellenar esta formulario con informacion ramdom no real para continuar con el proceso</p>
      <form onSubmit={handlingSubmit}>
        <h4>Informacion Personal:</h4>
        <div>
          {token !== null ? (
            <>
              <input type={"text"} placeholder="Nombre" value={"Nombre"} required readOnly />
              <input type={"text"} placeholder="Apellido" value={"Apellido"} required readOnly />
            </>
          ) : (
            <>
              <input type={"text"} onKeyDown={handlingName} placeholder="Nombre" required />
              <input type={"text"} onKeyDown={handlingName} placeholder="Apellido" required />
            </>
          )}
        </div>
        <h4>Informacion de envio:</h4>
        <div>
          <input type={"text"} onKeyDown={handlingAddress} placeholder="Direccion (7 - 50 digitos requeridos)" required />
        </div>
        <h4>Informacion de pago:</h4>
        <div>
          <input type={"text"} onKeyDown={handlingCardInfo} placeholder="Numero de tarjeta (16 digitos requerido)" required />
          <input type={"text"} onKeyDown={handlingCard3Code} placeholder="Codigo (3 digitos requeridos)" required />
          <input type={"date"} onKeyDown={handlingCardExpDate} placeholder="Fecha de expiracion (Mayor a la fecha actual)" required />
        </div>
        <button>Confirmar Pago</button>
      </form>
    </div>
  );
};

export default CheckOutView;
