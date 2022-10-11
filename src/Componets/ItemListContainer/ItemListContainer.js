import React, { useState } from "react";
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = () => {
  const gettingData = () => {
    console.log("Cargando fetch . . .");

    fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then((data) => {
        console.log("Convertiendo a JSON");
        return data.json();
      })
      .then((json) => {
        console.log("Compartiendo JSON");
        json.length > 0 ? setDB([...json]) : setDB([]);
        console.log("Compartido");
      })
      .catch((e) => {
        console.warn("Ha ocurrido un error obteniendo los products");
      });
  };

  gettingData();

  const [DB, setDB] = useState([]);

  return (
    <>
      <div className="ItemListContainer">
        <h2 className="ItemListContainer-Title">Productos que te puedan interesar</h2>
        <div className="ItemListContainer-ItemList">{DB.length > 0 ? <ItemList database={DB}></ItemList> : <h1>Cargando . . .</h1>}</div>
      </div>
    </>
  );
};

export default ItemListContainer;
