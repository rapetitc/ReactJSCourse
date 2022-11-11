import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../DB/DB";

const CartCounterContext = createContext();

export const CartCounterProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let tempCounter = 0;
    cart.forEach((item) => {
      tempCounter += item.quantity;
    });
    setTotalQty(tempCounter);
  }, [cart]);

  const checkingItemIntoCart = (idToCheck) => cart.some((item) => item.itemId === idToCheck);

  const addItemToCart = (itemId, quantity) => {
    if (checkingItemIntoCart(itemId)) {
      console.log("El producto se encuenta agregado al carrito");
      let tempCart = [];
      cart.forEach((product) => {
        if (itemId === product.itemId) {
          if (quantity > 0) {
            return tempCart.push({ itemId: itemId, quantity: quantity });
          } else {
            return;
          }
        }
        return tempCart.push(product);
      });
      console.log(tempCart);
      setCart(tempCart);
    } else {
      console.log("El producto no se encuenta agregado al carrito");
      setCart(cart.length > 0 ? [...cart, { itemId, quantity }] : [{ itemId, quantity }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    console.log("Removing", itemId);
  };

  const getData = async () => {
    let tempValue = [];
    let tempPrice = 0;

    for (let i = 0; i < cart.length; i++) {
      const docRef = doc(db, "products", cart[i].itemId);
      const docSnap = await getDoc(docRef);

      tempValue.push({ ...docSnap.data(), id: docSnap.id, quantity: cart[i].quantity });
      tempPrice += docSnap.data().price;
    }

    setTotalPrice(tempPrice);
    return tempValue;
  };

  return <CartCounterContext.Provider value={{ cart, totalQty, totalPrice, setCart, addItemToCart, removeItemFromCart, getData }}>{children}</CartCounterContext.Provider>;
};

export default CartCounterContext;
