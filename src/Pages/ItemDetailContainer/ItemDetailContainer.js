import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../DB/DB";
import "./ItemDetailContainer.css";

import RatingCalculator from "../../Components/RatingCalculator/RatingCalculator";
import PaymentMethods from "../../Components/PaymentMethods/PaymentMethods";
import ShippingAddress from "../../Components/ShippingAddress/ShippingAddress";

import CartCounterContext from "../../Context/CartCounter";

const CartButtons = ({ id }) => {
  const [counter, setCounter] = useState(0);
  const [disableMinusButton, setDisableMinusButton] = useState(false);

  const { addItemToCart } = useContext(CartCounterContext);

  const handlerConter = (value) => {
    if (value === +1) {
      return setCounter(counter + 1);
    }
    if (value === -1 && counter > 0) {
      return setCounter(counter - 1);
    }
    return setDisableMinusButton(true);
  };

  return (
    <div className="card-buttons">
      <div className="card-button-control">
        <button
          onClick={() => {
            handlerConter(-1);
          }}
          {...(disableMinusButton ? "disabled" : "")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
        </button>
        <input type={"text"} value={counter} readOnly />
        <button
          onClick={() => {
            handlerConter(+1);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <button
        onClick={() => {
          addItemToCart(id, counter);
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

const ItemDetailContainer = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProducts(params.id);
  }, [params.id]);

  const getProducts = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    setProduct([{ ...docSnap.data(), id: docSnap.id }]);
  };

  return (
    <div className="ItemDetailContainer_Container container">
      {product.length > 0 ? (
        <div>
          <div className="product-imgs">
            <div className="product-selection-box">
              {product[0].images.map((img, index) => {
                return <img src={img} alt={product.tittle} className="product-img" key={index} />;
              })}
            </div>
            <div className="product-img-preview">
              <img src={product[0].images[0]} alt={product[0].tittle} />
            </div>
          </div>
          <div className="card-body">
            <div className="card-description">
              <p className="card-availability">Nuevo | Disponibilidad de {product[0].stock}</p>
              <div className="card-title-container">
                <h3 className="card-title">{product[0].tittle + " " + product[0].description}</h3>
                <input type={"checkbox"} />
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </button>
              </div>
              <RatingCalculator value={product[0].rating} />
              <h3 className="card-price">${product[0].price}</h3>
              <PaymentMethods />
              <ShippingAddress />
              <CartButtons id={product[0].id} />
            </div>
          </div>
          <div>
            <h1>Publicaciones similares</h1>
          </div>
        </div>
      ) : (
        <div>Cargando . . . </div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
