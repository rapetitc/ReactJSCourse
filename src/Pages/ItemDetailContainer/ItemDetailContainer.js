import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Utilities/Firebase";
import "./ItemDetailContainer.css";

import ImgsPreview from "./ImgsPreview/ImgsPreview";
import RatingCalculator from "./RatingCalculator/RatingCalculator";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import ShippingAddress from "./ShippingAddress/ShippingAddress";
import CartButtons from "./CartButtons/CartButtons";

import CartCounterContext from "../../Context/CartCounter";
import BehaviorsContext from "../../Context/Behaviors";
import ProductTitle from "./ProductTitle/ProductTitle";

const settingItemQuantity = (cart, params) => {
  try {
    const tempItem = cart.find((e) => e.itemId === params.id);
    return [tempItem.quantity, true];
  } catch (error) {
    return [0, false];
  }
  /* return tempItem === undefined || tempItem === null ? [0, false] : [tempItem.quantity, true]; */
};

const ItemDetailContainer = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  const { cart } = useContext(CartCounterContext);
  const { outerWidth } = useContext(BehaviorsContext);

  const itemQuantity = settingItemQuantity(cart, params);

  const getProducts = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    setProduct([{ ...docSnap.data(), id: docSnap.id }]);
  };

  useEffect(() => {
    getProducts(params.id);
  }, [cart, params.id]);

  return (
    <div className="ItemDetailContainer_Container container">
      {product.length > 0 ? (
        outerWidth > 992 ? (
          <>
            <div>
              <ImgsPreview imgs={product[0].images} />
            </div>
            <div>
              <p>Nuevo | Disponibilidad de {product[0].stock}</p>
              <ProductTitle ProductTitle={product[0].tittle} />
              <RatingCalculator value={product[0].rating} />
              <h3>${product[0].price}</h3>
              <PaymentMethods />
              <ShippingAddress />
              <CartButtons id={product[0].id} itemQuantity={itemQuantity} stock={product[0].stock} />
            </div>
          </>
        ) : (
          <>
            <div>
              <p>Nuevo | Disponibilidad de {product[0].stock}</p>
              <ProductTitle ProductTitle={product[0].tittle} />
              <RatingCalculator value={product[0].rating} />
              <ImgsPreview imgs={product[0].images} />
              <h3>${product[0].price}</h3>
              <PaymentMethods />
              <ShippingAddress />
              <CartButtons id={product[0].id} itemQuantity={itemQuantity} stock={product[0].stock} />
            </div>
          </>
        )
      ) : (
        <div>Cargando . . . </div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
