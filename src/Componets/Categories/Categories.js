import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const params = useParams();
  const [categories, setCategories] = useState([]);

  const URL_BASE = "https://dummyjson.com/products/categories";

  useEffect(() => {
    console.log("Cargando fetch . . .");
    fetch(URL_BASE)
      .then((data) => {
        console.log("Convertiendo a JSON");
        return data.json();
      })
      .then((json) => {
        console.log("Compartiendo JSON", json);
        setCategories(json);
      })
      .catch((e) => {
        console.warn("Ha ocurrido un error obteniendo los products" + e);
      });
  }, []);

  return (
    <div className="Categories-Container">
      <h2>Categorias</h2>
      <ul>
        {categories.map((element, index) => {
          return (
            <li key={index}>
              <Link to={"/product/category/" + element}>{element}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
