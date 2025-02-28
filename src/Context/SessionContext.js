import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  collection,
  query,
  where,
  limit,
} from "firebase/firestore";
import moment from "moment/moment";

import { db } from "../utils/firebase_config";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("session"))
  );
  const [cartFunction, setCartFunction] = useState({});

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

      const session_data = {
        user: {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          roles: user.roles,
        },
        expiresOn: moment().add(24, "h").format(),
      };
      const { id } = await addDoc(collection(db, "logs"), session_data);
      await cartFunction?.retrieveCartFromDB(user.cart);
      const session = { id: id, ...session_data };
      localStorage.setItem("session", JSON.stringify(session));
      setSession(session);
    } else {
      throw new Error("USER_NOT_FOUND");
    }
  };

  const closeSession = async () => {
    await updateDoc(doc(db, "logs", session.id), {
      expiresOn: moment().format(),
    });
    cartFunction?.resetCart();
    localStorage.removeItem("session");
    setSession(null);
    navigate("/");
  };

  const extendSession = async () => {
    const expiresOn = moment(session.expiresOn).add(24, "h").format();
    await updateDoc(doc(db, "logs", session.id), { expiresOn });
    const new_session = { ...session, expiresOn };
    localStorage.setItem("session", JSON.stringify(new_session));
    setSession(new_session);
  };

  const isSessionActive = async () => {
    if (session === null) return;
    const isExpired = moment(session.expiresOn).isBefore(moment().format());
    if (isExpired) return await closeSession();
    await extendSession();
  };

  useEffect(() => {
    isSessionActive();
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, logIn, closeSession, setCartFunction }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
