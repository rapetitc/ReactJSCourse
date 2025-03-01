const payments = [
  {
    title: "Visa",
    urlImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
  },
  {
    title: "American Express",
    urlImg:
      "https://brandemia.org/sites/default/files/inline/images/american_express_logo_wordmark_detail.png",
  },
  {
    title: "MasterCard",
    urlImg:
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg",
  },
];

const PaymentMethods = () => {
  return (
    <div className="p-1 my-1">
      <h4>Hasta 48 cuotas</h4>
      <div className="flex gap-2">
        {payments.map((element, index) => (
          <div className="flex items-center w-15" key={index}>
            <img src={element.urlImg} alt={element.title} />
          </div>
        ))}
      </div>
      <button className="text-sm text-blue-800 font-semibold hover:underline hover:text-blue-500 cursor-pointer">
        Mas informacion
      </button>
    </div>
  );
};

export default PaymentMethods;
