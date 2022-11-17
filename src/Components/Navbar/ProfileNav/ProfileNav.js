import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./ProfileNav.css";

import AuthenticatorContext from "../../../Context/Authenticator";
import BehaviorsContext from "../../../Context/Behaviors";

const ProfileNav = () => {
  const { token, closeSession } = useContext(AuthenticatorContext);
  const { outerWidth } = useContext(BehaviorsContext);

  const handlingSessionClose = () => {
    closeSession();
  };

  return (
    <div className="ProfileNav_Container">
      {token !== null ? (
        outerWidth > 992 ? (
          <>
            <div className="profile-menu">
              <Link to="/profile" className="link">
                Bienvenido <span>{token.username}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
              </Link>
              <ul>
                <li>
                  <Link to={"/profile"} className="link">
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link to={"/profile/settings"} className="link">
                    Configuracion
                  </Link>
                </li>
                <li>
                  <Link onClick={handlingSessionClose} className="link">
                    Cerrar Sesion
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="/profile/purchases" className="link">
              Mis compras
            </Link>
          </>
        ) : (
          <>
            <div className="profile-menu">
              <Link to={"/profile"} className="link">
                Bienvenido <span>{token.username}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
              </Link>
              <ul>
                <li>
                  <Link to="/profile/purchases" className="link">
                    Mis compras
                  </Link>
                </li>
                <li>
                  <Link to={"/profile/settings"} className="link">
                    Configuracion
                  </Link>
                </li>
                <li>
                  <Link onClick={handlingSessionClose} className="link">
                    Cerrar Sesion
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )
      ) : outerWidth < 992 ? (
        <>
          <Link to="/create-account" className="btn">
            Crear una cuenta
          </Link>
          <Link to="/session" className="btn">
            Iniciar Sesion
          </Link>
        </>
      ) : (
        <>
          <Link to="/create-account" className="link">
            Crear una cuenta
          </Link>
          <Link to="/session" className="link">
            Iniciar Sesion
          </Link>
        </>
      )}
    </div>
  );
};

export default ProfileNav;
