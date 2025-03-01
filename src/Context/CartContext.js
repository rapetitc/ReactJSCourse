import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, updateDoc, collection } from "firebase/firestore";
import moment from "moment/moment";

import SessionContext from "./SessionContext";
import { db } from "../utils/firebase_config";

const CartContext = createContext();

const emptyCartTemplate = { id: "", products: [] };
const retrieveCartFromLS = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart !== null) return cart;
  localStorage.setItem("cart", JSON.stringify(emptyCartTemplate));
  return emptyCartTemplate;
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { session, setCartFunction } = useContext(SessionContext);
  const [cart, setCart] = useState(retrieveCartFromLS());
  const [detailedCart, setDetailedCart] = useState({});

  const createCart = async () => {
    const emptyCart = { products: [], lastModified: moment().format() };
    const { id } = await addDoc(collection(db, "carts"), emptyCart);
    return id;
  };

  const retrieveCartFromDB = async (cart_id) => {
    const results = await getDoc(doc(db, "carts", cart_id));
    const data = results.data();
    if (data.products.length == 0) {
      await updateCart(cart_id, cart.products);
    } else {
      const updated_cart = { id: results.id, ...data };
      localStorage.setItem("cart", JSON.stringify(updated_cart));
      setCart(updated_cart);
    }
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

  const updateCart = async (cart_id, products) => {
    const new_cart = { id: cart_id, products, lastModified: moment().format() };
    if (session) await updateDoc(doc(db, "carts", cart_id), { products });
    localStorage.setItem("cart", JSON.stringify(new_cart));
    setCart(new_cart);
  };

  const resetCart = () => {
    localStorage.setItem("cart", JSON.stringify(emptyCartTemplate));
    setCart(emptyCartTemplate);
  };

  const isItemInCart = (product_id) =>
    cart.products.find((prod) => prod.id == product_id)?.quantity || false;

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
      await updateCart(cart.id, products);
    } catch (error) {
      console.error("Error al actualizar producto en el carrito", error);
    }
  };

  const handlingPay = async () => {
    const { id } = await addDoc(collection(db, "tickets"), {
      ...detailedCart,
      date: moment().format(),
      buyer: session.user.id,
    });

    for (const product of detailedCart.products) {
      await updateDoc(doc(db, "products", product.id), {
        stock:
          detailedCart.products[0].stock - detailedCart.products[0].quantity,
      });
    }
    await updateCart(cart.id, []);
    navigate(`/ticket/${id}`);
  };

  useEffect(() => {
    setCartFunction({ retrieveCartFromDB, resetCart });
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        detailedCart,
        isItemInCart,
        createCart,
        getDetailedCart,
        handlingPay,
        updateItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
