import { createContext, useState, useEffect } from "react";
import { where, doc, updateDoc, collection, query, getDocs, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../DB/DB";

const AuthenticatorContext = createContext();

export const AuthenticatorProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [IP, setIP] = useState(null);

  useEffect(() => {
    getIPAddress();

    const existTokenInLS = localStorage.getItem("token");
    //console.log(JSON.parse(existTokenInLS));
    if (existTokenInLS === null) {
      //console.log("No Token Storaged, procediendo a chequear en userlogs table");
      checkingExistingLogsInIP();
    } else {
      //console.log("Existe");
      setToken(JSON.parse(existTokenInLS));
    }
  }, []);

  const getIPAddress = async () => {
    const fetchData = await fetch("https://api.ipify.org");
    const ipaddess = await fetchData.text();
    setIP(ipaddess);
  };

  const checkingExistingLogsInIP = async () => {
    console.log("aqui");
    const userlogsTable = collection(db, "userlogs");
    const querySnapshot = await getDocs(query(userlogsTable, where("ip", "==", IP), where("status", "==", "active")));

    if (!querySnapshot.empty) {
      const results = querySnapshot.docs[0].data();
      const token = { tokenid: querySnapshot.docs[0].id, username: results.username };

      localStorage.setItem("token", JSON.stringify(token));
      setToken(token);
    }
  };

  const logSession = async (data) => {
    const userlogsTable = collection(db, "userlogs");

    const info = {
      username: data.username,
      ip: IP,
      logdate: serverTimestamp(),
      status: "active",
    };

    const docRef = await addDoc(userlogsTable, info);

    const token = { tokenid: docRef.id, username: data.username };

    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  const session = async (credentials) => {
    //console.log(credentials.username, credentials.password);

    const usersTable = collection(db, "users");

    const querySnapshot = await getDocs(query(usersTable, where("username", "==", credentials.username), where("password", "==", credentials.password), limit(1)));

    if (!querySnapshot.empty) {
      //console.log(querySnapshot.docs[0].id);
      const results = querySnapshot.docs[0].data();
      logSession(results);
    } else {
      console.log("No se encontro un usuario");
    }
  };

  const closeSession = async () => {
    console.log("Cerrando Sesion");

    const docRef = doc(db, "userlogs", token.tokenid);
    const docSnap = await updateDoc(docRef, { status: "inactive" });
    console.log(docSnap);

    setTimeout(() => {
      localStorage.removeItem("token");
      setToken(null);
    }, 2000);
  };

  return <AuthenticatorContext.Provider value={{ token, session, closeSession }}>{children}</AuthenticatorContext.Provider>;
};

export default AuthenticatorContext;
