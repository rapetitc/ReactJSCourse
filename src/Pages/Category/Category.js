import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Utilities/Firebase";
import "./Category.css";

const Category = () => {
  const params = useParams();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const productsTable = collection(db, "products");

      const querySnapshot = await getDocs(query(productsTable, where("category", "==", params.id)));

      let tempCategory = [];
      querySnapshot.forEach((element) => {
        const tempData = element.data();
        tempCategory.push({ ...tempData, id: element.id });
      });

      setCategory(tempCategory);
    };
    getCategory();
  }, [params.id]);

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
                    <img src={element.images[0]} alt="..." />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{element.tittle}</h5>
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
