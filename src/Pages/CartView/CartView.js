import React, { useContext, useEffect, useState } from "react";
import { useHref, useNavigate } from "react-router-dom";
import "./CartView.css";

import Main from "./Main/Main";

import CartCounterContext from "../../Context/CartCounter";
import CheckOutView from "./CheckOutView/CheckOutView";
import CheckOutConfirmation from "./CheckOutConfirmation/CheckOutConfirmation";
import Congratulation from "./Congratulations/Congratulation";

const CartView = () => {
  const [element, setElement] = useState(<></>);
  const [tempCart, setTempCart] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [orderNumber, setOrderNumber] = useState({});

  const navigate = useNavigate();
  const currentLocation = useHref();

  const { getData, totalPrice, totalQty } = useContext(CartCounterContext);

  useEffect(() => {
    const call = async () => {
      setTempCart(await getData());
    };
    call();

    const cartStages = (currentLocation) => {
      if (currentLocation === "/cart") {
        setElement(<Main tempCart={tempCart} totalPrice={totalPrice} totalQty={totalQty} />);
      } else if (currentLocation === "/cart/checkout") {
        setElement(<CheckOutView setUserInfo={setUserInfo} userInfo={userInfo} />);
      } else if (currentLocation === "/cart/confirmation") {
        setElement(<CheckOutConfirmation tempCart={tempCart} userInfo={userInfo} setOrderNumber={setOrderNumber} totalPrice={totalPrice} />);
      } else if (currentLocation === "/cart/congratulations") {
        setElement(<Congratulation orderNumber={orderNumber} />);
      } else {
        navigate("/cart");
      }
    };
    cartStages(currentLocation);
  }, [getData, currentLocation, tempCart, totalPrice, totalQty, userInfo, orderNumber, navigate]);

  return <div className="CartView_Container container">{element}</div>;
};

export default CartView;
