import { useContext } from "react";
import { Link } from "react-router-dom";

import SessionContext from "../Context/SessionContext";

const ProfileNav = () => {
  const { session, closeSession } = useContext(SessionContext);

  return (
    <div className="flex gap-6 items-center">
      {session === null ? (
        <>
          <Link to="/create-account" className="hover:underline">
            Registrarse
          </Link>
          <Link to="/login" className="px-3 py-1 rounded bg-white">
            Iniciar Sesion
          </Link>
        </>
      ) : (
        <>
          <Link to="/sell" className="hover:underline">
            Vender
          </Link>
          <div className="flex flex-col hover:bg-white group">
            <button className="flex items-center gap-2 px-3 py-1 rounded bg-white hover:cursor-pointer">
              ¡Bienvenido {session.user.fname}!{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="size-4 group-hover:-rotate-90 duration-100"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
            </button>
            <div className="relative invisible group-hover:visible group-hover:bg-white">
              <div className="flex flex-col items-end gap-2 absolute w-full p-2 bg-white border-t border-gray-200">
                <Link
                  to={"/profile"}
                  className="w-full px-2 py-1 text-end hover:underline"
                >
                  Perfil
                </Link>
                <button
                  className="w-full px-2 py-1 text-end bg-gray-100 rounded hover:cursor-pointer"
                  onClick={async () => {
                    await closeSession();
                  }}
                >
                  Cerrar Sesion
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileNav;
