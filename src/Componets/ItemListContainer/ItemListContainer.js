import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import ItemList from "./ItemList/ItemList";

const ItemListContainer = () => {
  const [iterador, setIterador] = useState(0);
  const [DB, setDB] = useState([]);

  useEffect(() => {
    console.log("Cargando fetch . . .");

    fetch("https://dummyjson.com/products")
      .then((data) => {
        console.log("Convertiendo a JSON");
        return data.json();
      })
      .then((json) => {
        console.log("Compartiendo JSON");
        json.products.length > 0 ? setDB([...json.products]) : setDB([]);
        setIterador(iterador + 1);
        console.log("Compartido", json.products);
      })
      .catch((e) => {
        console.warn("Ha ocurrido un error obteniendo los products");
      });
  }, []);

  return (
    <div className="ItemListContainer">
      <h2 className="ItemListContainer-Title">Productos que te puedan interesar</h2>
      {DB.length > 0 ? <ItemList database={DB}></ItemList> : <h1>Cargando . . .</h1>}
    </div>
  );
};

export default ItemListContainer;
