import React from "react";
import "./PaymentMethods.css"

const payments = [
  { title: "Visa", urlImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" },
  { title: "American Express", urlImg: "https://brandemia.org/sites/default/files/inline/images/american_express_logo_wordmark_detail.png" },
  { title: "MasterCard", urlImg: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" },
];

const PaymentMethods = () => {
  return (
    <div className="PaymentMethods_Container">
      <h4>Hasta 48 cuotas</h4>
      <div>
        {payments.map((element, index) => (
          <img src={element.urlImg} alt={element.title} key={index} />
        ))}
      </div>
      <button>Mas informacion</button>
    </div>
  );
};

export default PaymentMethods;
