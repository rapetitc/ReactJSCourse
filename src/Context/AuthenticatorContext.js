import { createContext, useContext, useEffect, useState } from "react";
import moment from "moment/moment";
import {
  where,
  collection,
  query,
  getDocs,
  limit,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../utils/firebase_config";
import CartContext from "./CartContext";

const AuthenticatorContext = createContext();

export const AuthenticatorProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("session"))
  );
  const { downloadCart, removeCart } = useContext(CartContext);
  const navigate = useNavigate()

  const logIn = async ({ username, password }) => {
    if (
      new RegExp("[a-z,A-Z,0-9]+@[a-z,A-Z,0-9]+.[a-z,A-Z,0-9]{2,}").exec(
        username
      ) == null
    )
      throw new Error("USERNAME_INVALID_FORMAT");
    if (new RegExp("[a-z,A-Z,0-9]{8,24}").exec(password) == null)
      throw new Error("PASSWORD_INVALID_FORMAT");

    const data = await getDocs(
      query(collection(db, "users"), where("email", "==", username), limit(1))
    );

    if (!data.empty) {
      const user_data = data.docs[0].data();
      const user = { id: data.docs[0].id, ...user_data };
      if (user.password !== password) throw new Error("INCORRECT_PASSWORD");

      const token_data = {
        user: { id: user.id, fname: user.fname, lname: user.lname },
        expiresOn: moment().add(24, "h").format(),
      };
      const { id } = await addDoc(collection(db, "logs"), token_data);
      await downloadCart(user.cart);
      const token = { id: id, ...token_data };
      localStorage.setItem("session", JSON.stringify(token));
      setToken(token);
    } else {
      throw new Error("USER_NOT_FOUND");
    }
  };

  const updateSession = async () => {
    const expiresOn = moment(token.expiresOn).add(24, "h").format();
    await updateDoc(doc(db, "logs", token.id), { expiresOn });
    localStorage.setItem("session", JSON.stringify({ ...token, expiresOn }));
    setToken({ ...token, expiresOn });
  };

  const closeSession = async () => {
    await updateDoc(doc(db, "logs", token.id), {
      expiresOn: moment().format(),
    });
    removeCart()
    localStorage.removeItem("session");
    setToken(null);
    navigate("/")
  };

  const isActive = async () => {
    if (token != null) {
      // TODO Consultar el token de la nuve tambien
      const isExpired = moment(token.expiresOn).isBefore(moment());
      if (isExpired) {
        await closeSession();
      } else {
        await updateSession();
      }
    }
  };

  useEffect(() => {
    isActive();
  }, [token?.id ?? undefined]);

  return (
    <AuthenticatorContext.Provider value={{ token, logIn, closeSession }}>
      {children}
    </AuthenticatorContext.Provider>
  );
};

export default AuthenticatorContext;
