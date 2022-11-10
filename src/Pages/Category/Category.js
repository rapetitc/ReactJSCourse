import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Category.css";

const Category = () => {
  const params = useParams();
  const [category, setCategory] = useState([]);

  const URL_BASE = "https://dummyjson.com/products/category/" + params.id;

  useEffect(() => {
    fetch(URL_BASE)
      .then((data) => data.json())
      .then((data) => {
        setCategory([...data.products]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [URL_BASE]);

  return (
    <div className="Category_Container container">
      <h2>Todo lo que quieras ver de {params.id}</h2>
      <div>
        {category.length > 0 ? (
          category.map((element, index) => {
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
          })
        ) : (
          <div>Cargando . . .</div>
        )}
      </div>
    </div>
  );
};

export default Category;
