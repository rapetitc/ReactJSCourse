import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./Session.css";

import AuthenticatorContext from "../../Context/Authenticator";

const Session = () => {
  const { token, session } = useContext(AuthenticatorContext);

  const handlerSubmit = (e) => {
    e.preventDefault();

    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    session({ username, password });
  };

  return (
    <div className="Session_Container fluid-container">
      {token === null ? (
        <div className="login-box">
          <h3>Iniciar Session</h3>
          <form onSubmit={handlerSubmit}>
            <input type={"text"} placeholder={"Nombre de usuario"} />
            <input type={"password"} placeholder={"Contraseña"} />
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
