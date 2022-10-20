import React from "react";
import "./SubscriptionNav.css";
import SubscriptionIMG from "../../../Media/SubscriptionNavIMG.png";

const SubscriptionNav = () => {
  return (
    <div className="subscriptionNa-Container">
      <a href="$" className="subscriptionNa-Link">
        <img src={SubscriptionIMG} alt='Suscribete al nivel 6!' className="subscriptionNa-IMG" />
      </a>
    </div>
  );
};

export default SubscriptionNav;
