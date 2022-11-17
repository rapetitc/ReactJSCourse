import React, { useContext, useEffect, useState } from "react";
import { useHref, useNavigate } from "react-router-dom";
import "./CartView.css";

import Main from "./MainCartView/MainCartView";
import CheckOutView from "./CheckOutView/CheckOutView";
/* import CheckOutConfirmation from "./CheckOutConfirmation/CheckOutConfirmation"; */
import Congratulation from "./Congratulations/Congratulation";

import CartCounterContext from "../../Context/CartCounter";

const CartView = () => {
  const [fullCart, setFullCart] = useState([]);
  const [element, setElement] = useState(<></>);
  const [userInfo, setUserInfo] = useState({});
  const [orderNumber, setOrderNumber] = useState({});

  const navigate = useNavigate();
  const currentLocation = useHref();

  const { getData, totalPrice, totalQty } = useContext(CartCounterContext);

  useEffect(() => {
    const call = async () => {
      setFullCart(await getData());
    };
    call();

    const cartStages = (currentLocation) => {
      if (currentLocation === "/cart") {
        setElement(<Main fullCart={fullCart} totalPrice={totalPrice} totalQty={totalQty} />);
      } else if (currentLocation === "/cart/checkout") {
        setElement(<CheckOutView setUserInfo={setUserInfo} userInfo={userInfo} setOrderNumber={setOrderNumber} totalPrice={totalPrice} fullCart={fullCart} />);
      } /* else if (currentLocation === "/cart/confirmation") {
        setElement(<CheckOutConfirmation fullCart={fullCart} userInfo={userInfo} setOrderNumber={setOrderNumber} totalPrice={totalPrice} />);
      } */ else if (currentLocation === "/cart/congratulations") {
        setElement(<Congratulation orderNumber={orderNumber} />);
      } else {
        navigate("/cart");
      }
    };
    cartStages(currentLocation);
  }, [getData, currentLocation, totalPrice, totalQty, navigate, fullCart, userInfo, orderNumber]);

  return <div className="CartView_Container container">{element}</div>;
};

export default CartView;
