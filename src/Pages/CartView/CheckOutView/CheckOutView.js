import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { isArrow, isRemoving, isTab } from "../../../Utilities/KeyEvaluator";
import { db } from "../../../Utilities/Firebase";
import "./CheckOutView.css";

import AuthenticatorContext from "../../../Context/Authenticator";

const CheckOutView = ({ userInfo, setUserInfo, setOrderNumber, fullCart, totalPrice }) => {
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

    purchase();
  };

  const purchase = async () => {
    const ordersTable = collection(db, "orders");
    const data = {
      soldby: "publisher",
      purchaseby: userInfo,
      creationdate: serverTimestamp(),
      items: fullCart,
      totalPrice: totalPrice,
      status: "complete",
    };

    const docRef = await addDoc(ordersTable, data);

    setOrderNumber(docRef.id);

    navigate("/cart/congratulations");
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

  return (
    <div className="CheckOutView_Container container">
      <h3>Formulario de pago</h3>
      <p>Este es un simulador, solo intenta rellenar esta formulario con informacion ramdom no real para continuar con el proceso.</p>
      <form onSubmit={handlingSubmit}>
        <div className="form-body">
          <h4>Informacion Personal :</h4>
          <div>
            {token !== null ? (
              <>
                <input className="input" type={"text"} placeholder="Nombre" value={"Nombre"} required readOnly />
                <input className="input" type={"text"} placeholder="Apellido" value={"Apellido"} required readOnly />
              </>
            ) : (
              <>
                <input className="input" type={"text"} onKeyDown={handlingName} placeholder="Nombre" required />
                <input className="input" type={"text"} onKeyDown={handlingName} placeholder="Apellido" required />
              </>
            )}
          </div>
          <h4>Informacion de envio :</h4>
          <div>
            <input className="input" type={"text"} onKeyDown={handlingAddress} placeholder="Direccion (7 - 50 digitos requeridos)" required />
          </div>
          <h4>Informacion de pago :</h4>
          <div>
            <input className="input" type={"text"} onKeyDown={handlingCardInfo} placeholder="Numero de tarjeta (16 digitos requerido)" required />
            <input className="input" type={"text"} onKeyDown={handlingCard3Code} placeholder="Codigo (3 digitos requeridos)" required />
            <input className="input" type={"date"} placeholder="Fecha de expiracion (Mayor a la fecha actual)" required />
          </div>

          <h4>Carrito :</h4>
          <div>
            <p> Precio Total: ${totalPrice}</p>
          </div>
        </div>
        <div className="form-footer">
          <button className="btn">Pagar</button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutView;
