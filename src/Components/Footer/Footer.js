import React from "react";
import "./Footer.css";

import { uploadImages } from "../../Utilities/Firebase";

const Footer = () => {
  const handlingSubmit = (e) => {
    e.preventDefault();
    const files = e.target[0].files;
    console.log(files[0]);
    uploadImages(files[0]);
  };

  return (
    <div className="Footer_Container fluid-container">
      <div className="container">
        <h2>
          Diseñado por{" "}
          <span>
            <a href="https://www.linkedin.com/in/rapetitc/" title="rapetitc's Linkedin Profile">
              @rapetitc
            </a>
          </span>
        </h2>
        <form onSubmit={handlingSubmit}>
          <input type={"file"} />
          <button type="submit"> Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
