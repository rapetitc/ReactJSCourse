import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const params = useParams();
  const [category, setCategory] = useState([]);

  const URL_BASE = "https://dummyjson.com/products/category/" + params.id;
  console.log(URL_BASE);

  useEffect(() => {
    console.log("Cargando fetch . . .");
    fetch(URL_BASE)
      .then((data) => {
        console.log("Convertiendo a JSON");
        return data.json();
      })
      .then((json) => {
        console.log("Compartiendo JSON", json);
        setCategory([...json.products]);
      })
      .catch((e) => {
        console.warn("Ha ocurrido un error obteniendo los products" + e);
      });
  }, []);

  return (
    <div>
      {category.map((element, index) => {
        return (
          <Link to={"/product/" + element.id} key={index}>
            <div className="card">
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
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
