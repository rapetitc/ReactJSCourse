import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./Session.css";

import AuthenticatorContext from "../../Context/Authenticator";

const Session = () => {
  const { auth, consult } = useContext(AuthenticatorContext);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    consult(email, password)
  };
  return (
    <div className="Session_Container fluid-container">
      {auth === null ? (
        <div className="login-box">
          <h3>Iniciar Session</h3>
          <form onSubmit={handlerSubmit}>
            <input type={"text"} placeholder={"Nombre de usuario (admin)"} />
            <input type={"password"} placeholder={"Contraseña (admin)"} />
            <button type="submit">Iniciar Session</button>
          </form>
        </div>
      ) : (
        <div>
          <Navigate to={"/"}></Navigate>
        </div>
      )}
    </div>
  );
};

export default Session;
