import React from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Utilities/Firebase";
import "./CheckOutConfirmation.css";

const CheckOutConfirmation = ({ tempCart, userInfo, setOrderNumber, totalPrice }) => {
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    purchase();
  };

  const purchase = async () => {
    const ordersTable = collection(db, "orders");
    const data = {
      soldby: "publisher",
      purchaseby: userInfo,
      creationdate: serverTimestamp(),
      items: tempCart,
      totalPrice: totalPrice,
      status: "complete",
    };

    const docRef = await addDoc(ordersTable, data);

    setOrderNumber(docRef.id);

    navigate("/cart/congratulations");
  };

  return (
    <div>
      <h4>Confirmacion de compra</h4>
      <form onSubmit={handlingSubmit}>
        <button>Procesar Compra</button>
      </form>
    </div>
  );
};

export default CheckOutConfirmation;
