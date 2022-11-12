import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./ProfileNav.css";

import AuthenticatorContext from "../../../Context/Authenticator";

const ProfileNav = () => {
  const { token, closeSession } = useContext(AuthenticatorContext);

  const handlingSessionClose = () => {
    closeSession();
  };

  return (
    <div className="ProfileNav_Container">
      {token !== null ? (
        <>
          <div className="profile-menu">
            <Link to="/profile" className="profile-link">
              Bienvenido <span>{token.username}</span>{" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </Link>
            <ul>
              <li>
                <Link to={"/profile"} className="profile-link">
                  Perfil
                </Link>
              </li>
              <li>
                <Link to={"/profile/settings"} className="profile-link">
                  Configuracion
                </Link>
              </li>
              <li>
                <Link onClick={handlingSessionClose} className="profile-link">
                  Cerrar Sesion
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/profile/purchases" className="profile-link">
            Mis compras
          </Link>
        </>
      ) : (
        <>
          <Link to="/create-account" className="profile-link">
            Crear una cuenta
          </Link>
          <Link to="/session" className="profile-link">
            Iniciar Sesion
          </Link>
        </>
      )}
    </div>
  );
};

export default ProfileNav;
