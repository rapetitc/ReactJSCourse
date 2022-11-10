import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import ItemList from "./ItemList/ItemList";

const ItemListContainer = () => {
  const [DB, setDB] = useState([]);

  const URL_BASE = "https://dummyjson.com/products";

  useEffect(() => {
    fetch(URL_BASE)
      .then((data) => data.json())
      .then((json) => {
        json.products.length > 0 ? setDB([...json.products]) : setDB([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <div className="ItemListContainer container">{DB.length > 0 ? <ItemList database={DB}></ItemList> : <h1>Cargando . . .</h1>}</div>;
};

export default ItemListContainer;
