import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../DB/DB";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const productsTable = collection(db, "products");

    const querySnapshot = await getDocs(query(productsTable));

    let tempCategories = [];
    querySnapshot.forEach((element) => {
      const category = element.data().category;

      if (!tempCategories.includes(category)) {
        tempCategories.push(category);
      }
    });

    setCategories(tempCategories);
  };

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
