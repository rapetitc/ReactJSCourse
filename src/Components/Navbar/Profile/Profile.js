import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Profile.css";

import AuthenticatorContext from "../../../Context/Authenticator";

const Profile = ({ shoppingcart }) => {
  const { auth, closeSession } = useContext(AuthenticatorContext);

  const handlingSessionClose = () => {
    closeSession();
  };

  return (
    <div className="Profile_Container">
      {auth !== null ? (
        <>
          <div className="profile-menu">
            <Link to="/profile" className="profile-link">
              Bienvenido <span>{auth.firstName}</span>{" "}
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
      {shoppingcart}
    </div>
  );
};

export default Profile;
