import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../Utilities/Firebase";

const CartCounterContext = createContext();

export const CartCounterProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const updatingCartInLs = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const checkingItemIntoCart = (idToCheck) => cart.some((item) => item.itemId === idToCheck);

  const addItemToCart = (itemId, quantity) => {
    if (checkingItemIntoCart(itemId)) {
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
      updatingCartInLs(tempCart);
      setCart(tempCart);
    } else {
      updatingCartInLs(cart.length > 0 ? [...cart, { itemId, quantity }] : [{ itemId, quantity }]);
      setCart(cart.length > 0 ? [...cart, { itemId, quantity }] : [{ itemId, quantity }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    console.log("Removing", itemId);
  };

  const checkDiscount = async (productId) => {
    const discountToReturn = 0;

    const discountsTable = collection(db, "discounts");
    const docSnapshot = await getDocs(query(discountsTable, where("itemtoapply", "==", productId), limit(1)));

    if (!docSnapshot.empty) {
      const item = docSnapshot.docs.data();
      console.log("Deberia aplicar el siguiente descuento                 :", item.discount);
    }
    return discountToReturn;
  };

  const checkTaxes = async (categoryId) => {
    const taxToReturn = 0;

    const discountsTable = collection(db, "taxes");
    const docSnapshot = await getDocs(query(discountsTable, where("categorytoapply", "==", categoryId), limit(1)));

    if (!docSnapshot.empty) {
      const item = docSnapshot.docs.data();
      console.log("Deberia aplicar el siguiente impuesto:", item.tax);
    }
    return taxToReturn;
  };

  const getData = async () => {
    let tempValue = [];
    let tempPrice = 0;

    for (let i = 0; i < cart.length; i++) {
      const docRef = doc(db, "products", cart[i].itemId);
      const docSnap = await getDoc(docRef);

      const productId = docSnap.id;
      const product = docSnap.data();
      const discount = await checkDiscount(productId);
      const tax = await checkTaxes(productId);
      const totalUnitPrice = product.price + (product.price - discount) * (tax / 100);

      tempValue.push({ ...product, id: docSnap.id, quantity: cart[i].quantity, discount: discount, tax: tax, totalunitprice: totalUnitPrice });
      tempPrice += totalUnitPrice * cart[i].quantity;
    }

    setTotalPrice(tempPrice);
    return tempValue;
  };

  useEffect(() => {
    let existsCartInLs = localStorage.getItem("cart");

    if (existsCartInLs === null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      existsCartInLs = JSON.parse(existsCartInLs);
      if (existsCartInLs.length !== cart.length) {
        setCart(existsCartInLs);
      }
    }

    let tempCounter = 0;
    cart.forEach((item) => {
      tempCounter += item.quantity;
    });
    setTotalQty(tempCounter);
  }, [cart, setCart]);

  return <CartCounterContext.Provider value={{ cart, totalQty, totalPrice, setCart, addItemToCart, removeItemFromCart, getData }}>{children}</CartCounterContext.Provider>;
};

export default CartCounterContext;
