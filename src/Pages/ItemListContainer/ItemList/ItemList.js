import React from "react";
import { Link } from "react-router-dom";
import "./ItemList.css";

const ItemList = ({ database }) => {
  return (
    <div className="ItemList_Container">
      <h2>Productos que te puedan interesar</h2>
      <div>
        {database.map((element, index) => {
          return (
            <div className="card" key={index}>
              <Link to={"/product/" + element.id}>
                <div className="card-img">
                  <img src={element.thumbnail} alt="..." />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{element.title}</h5>
                  <div className="card-price">
                    <p>{element.discount ? "$" + element.discount : ""}</p>
                    <p>${element.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
