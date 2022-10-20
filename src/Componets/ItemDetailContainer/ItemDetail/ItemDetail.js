import React from "react";
import "./ItemDetail.css";

const ItemDetail = ({ database }) => {
  return (
    <div className="ItemDetail">
      <div className="card-imgs">
        {database[0].images.map((ele, index) => {
          return <img src={ele} alt={database.title} className="card-img" key={index} />;
        })}
      </div>
      <div className="card-img-preview">
        <img src={database[0].thumbnail} alt={database[0].title} />
      </div>
      <div className="card-body">
        <div className="card-description">
          <p className="card-availability">Nuevo | Disponibilidad de {database[0].stock}</p>
          <h3 className="card-title">{database[0].title + " " + database[0].description}</h3>
          <h3 className="card-price">${database[0].price}</h3>
          <div className="">Tipos de pagos</div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
