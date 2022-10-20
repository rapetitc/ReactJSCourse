import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const params = useParams();

  const [product, setProduct] = useState([]);
  const [iterador, setIterador] = useState(1);

  useEffect(() => {
    console.log("Cargando fetch . . .");
    setIterador(iterador + 1);

    fetch("https://dummyjson.com/products/" + params.id)
      .then((data) => {
        console.log("Convertiendo a JSON");
        return data.json();
      })
      .then((json) => {
        console.log("JSON listo para uso", "Se han cargado ", iterador, "Veces");
        setProduct([json]);
      })
      .catch((e) => {
        console.warn("Ha ocurrido un error obteniendo los detalles del producto");
      });
  }, []);

  return <div className="ItemDetailContainer">{product.length > 0 ? <ItemDetail database={product}></ItemDetail> : <div>Cargando . . . </div>}</div>;
};

export default ItemDetailContainer;
