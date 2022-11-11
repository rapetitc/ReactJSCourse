import React, { useEffect, useState } from "react";
import { getDocs, collection, query, limit } from "firebase/firestore";
import { db } from "../../DB/DB";
import "./ItemListContainer.css";

import ItemList from "./ItemList/ItemList";

const ItemListContainer = () => {
  const [DB, setDB] = useState([]);

  useEffect(() => {
    consultingProducts();
  }, []);

  const consultingProducts = async () => {
    const productsTable = collection(db, "products");
    const querySnapshot = await getDocs(query(productsTable, limit(30)));

    let data = [];
    querySnapshot.forEach((element) => {
      const tempData = { ...element.data(), id: element.id };
      data.push(tempData);
    });
    setDB(data);
  };

  return <div className="ItemListContainer container">{DB.length > 0 ? <ItemList database={DB}></ItemList> : <h1>Cargando . . .</h1>}</div>;
};

export default ItemListContainer;
