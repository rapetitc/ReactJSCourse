import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const URL_BASE = "https://dummyjson.com/products/categories";

  useEffect(() => {
    fetch(URL_BASE)
      .then((data) => data.json())
      .then((json) => {
        setCategories(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="Categories_Container container">
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
