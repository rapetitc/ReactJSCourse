import React from "react";
import logo from "../../Media/logo.png";

const style = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "70px",
  },
};
const Title = () => {
  return (
    <div style={style.container}>
      <img style={style.logo} src={logo} alt="Online Store Logo" />
      <h1>Online Store</h1>
    </div>
  );
};

export default Title;
