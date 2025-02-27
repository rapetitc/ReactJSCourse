import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthenticatorContext from "../Context/AuthenticatorContext";
import BrandTitle from "../Components/BrandTitle";

const LogIn = () => {
  const { logIn } = useContext(AuthenticatorContext);
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    try {
      await logIn({ username, password });
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  };

  return (
    <>
      <header className="bg-yellow-200">
        <div className="grid grid-cols-12 items-end w-[1280px] mx-auto">
          <div className="col-span-3 flex justify-end">
            <BrandTitle />
          </div>
        </div>
      </header>
      <div className="flex justify-center w-full h-[120px] pt-[40px] bg-yellow-200">
        <div className="h-max max-w-[500px] p-5 bg-white shadow-xl">
          <div className="my-5">
            <h3 className="my-2 text-2xl text-center">Iniciar Session</h3>
            <p className="text-lg text-center">
              Ingresá tu e-mail para iniciar sesión
            </p>
          </div>
          <form
            className="flex flex-wrap gap-4 my-1 p-4"
            onSubmit={handlerSubmit}
          >
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              pattern="\w+@\w+.\w{2,}"
              placeholder="Nombre de usuario"
              required
            />
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              pattern="\w{8,24}"
              placeholder="Contraseña"
              required
            />
            <button
              type="submit"
              className="w-full px-3 py-2 bg-blue-400 rounded cursor-pointer"
            >
              Iniciar Session
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
