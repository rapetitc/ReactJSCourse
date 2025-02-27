import { createContext, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../utils/firebase_config";
import moment from "moment/moment";

const CartContext = createContext();

//FIXME hacerlo funcionar para invitado, y al momento de pagar, pedir registrarse
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [detailedCart, setDetailedCart] = useState({});
  const navigate = useNavigate();

  const createCart = async () => {
    const { id } = await addDoc(collection(db, "carts"), emptyCart);
    const emptyCart = { products: [], lastModified: new Date() };
    return id;
  };

  const downloadCart = async (cid) => {
    const data = await getDoc(doc(db, "carts", cid));
    const cart = { id: data.id, ...data.data() };
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };

  const getDetailedCart = async () => {
    const products = [];
    let total_price = 0;

    for (let i = 0; i < cart.products.length; i++) {
      const results = await getDoc(doc(db, "products", cart.products[i].id));
      const data = results.data();
      const product = {
        id: results.id,
        title: data.title,
        brand: data.brand,
        price: data.price,
        quantity: cart.products[i].quantity,
        stock: data.stock,
      };
      total_price += product.price * product.quantity;
      products.push(product);
    }

    setDetailedCart({ products: products, total_price });
  };

  const updateCart = async (products) => {
    const newCart = { id: cart.id, products, lastModified: new Date() };
    await updateDoc(doc(db, "carts", cart.id), { products });
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const removeCart = () => {
    localStorage.removeItem("cart");
    setCart(null);
  };

  const isItemInCart = (product_id) => {
    const product = cart?.products.find((prod) => prod.id == product_id);
    return product == undefined ? null : product.quantity;
  };

  const updateItemInCart = async (product_id, quantity) => {
    let products = [...cart.products];

    const product = products.find((prod) => prod.id == product_id);

    if (product == undefined) {
      products = [...products, { id: product_id, quantity: quantity }];
    } else {
      const index = products.indexOf(product);
      if (quantity == 0) {
        products.splice(index - 1, 1);
      } else {
        products[index].quantity = quantity;
      }
    }
    try {
      await updateCart(products);
    } catch (error) {
      console.error("Error al actualizar producto en el carrito", error);
    }
  };

  const handlingPay = async () => {
    const { id } = await addDoc(collection(db, "tickets"), {
      ...detailedCart,
      date: moment().format(),
    });

    for (const product of detailedCart.products) {
      await updateDoc(doc(db, "products", product.id), {
        stock:
          detailedCart.products[0].stock - detailedCart.products[0].quantity,
      });
    }
    await updateCart([]);
    navigate(`/ticket/${id}`);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        detailedCart,
        isItemInCart,
        createCart,
        removeCart,
        getDetailedCart,
        downloadCart,
        handlingPay,
        updateItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
