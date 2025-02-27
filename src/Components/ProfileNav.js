import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthenticatorContext from "../Context/AuthenticatorContext";

const ProfileNav = () => {
  const { token, closeSession } = useContext(AuthenticatorContext);

  return token === null ? (
    <div className="flex gap-4">
      <Link to="/create-account" className="hover:underline">
        Crear una cuenta
      </Link>
      <Link to="/login" className="hover:underline">
        Iniciar Sesion
      </Link>
    </div>
  ) : (
    <div className="flex flex-col relative gap-4 rounded bg-white group">
      {/* TODO Mejorar UI, considerar poner el enlace hacia "VENDER" */}
      <button className="px-2 py-1 hover:cursor-pointer">
        Bienvenido {token.user.fname}!
      </button>
      <div className="flex flex-col items-end gap-2 absolute -top-[-32px] invisible w-full px-2 py-2 bg-gray-100 group-hover:visible">
        <Link to={"/profile"} className="hover:cursor-pointer">
          Perfil
        </Link>
        <button
          className="hover:cursor-pointer"
          onClick={async () => {
            await closeSession();
          }}
        >
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
};

export default ProfileNav;
