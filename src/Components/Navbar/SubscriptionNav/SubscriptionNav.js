import React from "react";
import "./SubscriptionNav.css";
import SubscriptionIMG from "../../../Media/SubscriptionNavIMG.png";
import { Link } from "react-router-dom";

const SubscriptionNav = () => {
  return (
    <div className="SubscriptionNav_Container">
      <Link to={"/subscription"} className="subscriptionNa-Link">
        <img src={SubscriptionIMG} alt="Suscribete al nivel 6!" className="subscriptionNa-IMG" />
      </Link>
    </div>
  );
};

export default SubscriptionNav;
