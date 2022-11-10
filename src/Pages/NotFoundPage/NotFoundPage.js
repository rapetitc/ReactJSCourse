import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="NotFoundPage_Container container">
      <div>
        <h2>Opps!, No encontramos esta direccion</h2>
        <h3>Error 404, Page not found</h3>
        <p>
          Haz <Link to={"/"}>click aqui</Link> para volver a la pagina principal
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
