import { createContext, useState } from "react";
import { where, collection, query, getDocs, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../DB/DB";

const AuthenticatorContext = createContext();
/* asd@asd.com asdqqdw */
export const AuthenticatorProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [tempData, setTempData] = useState({});

  const consult = async (email, password) => {
    const usersTable = collection(db, "users");
    const querySnapshot = await getDocs(query(usersTable, where("email", "==", email), where("password", "==", password)));
    querySnapshot.forEach((doc) => {
      setTempData(doc.data());
    });

    if (tempData.email === email && tempData.password === password) {
      console.log("si");
      setAuth({
        token: "6156asd61asd65arwg",
        email: tempData.email,
        firstName: tempData.fname,
        lastName: tempData.lname,
      });
    } else {
      setAuth(null);
    }
  };
  const closeSession = () => {
    setAuth(null);
  };

  return <AuthenticatorContext.Provider value={{ auth, setAuth, consult, closeSession }}>{children}</AuthenticatorContext.Provider>;
};

export default AuthenticatorContext;
