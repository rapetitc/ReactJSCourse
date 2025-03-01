import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../utils/firebase_config";
import CartContext from "../Context/CartContext";

const Requirements = ({ userInfo }) => {
  const navigate = useNavigate();
  const { createCart } = useContext(CartContext);

  const createAccount = async () => {
    try {
      await addDoc(collection(db, "users"), {
        ...userInfo,
        cart: await createCart(),
      });
      navigate("/create-account/done");
    } catch (error) {
      console.error("Error al crear usuario", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex items-center gap-3 w-full p-1 mx-7">
        <svg fill="currentColor" className="size-8" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
          <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
        </svg>
        <h4 className="text-xl">Tus Datos</h4>
      </div>
      <p className="py-2 my-2 text-center">
        Valida tus datos para que nadie pueda ingresar o crear una cuenta a tu
        nombre.
      </p>
      <div className="">
        <div className="flex gap-3 px-3 py-5 my-2 border border-gray-200 rounded">
          <div className="rounded-full border size-max p-2">
            <svg fill="currentColor" className="size-5" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
          </div>
          <div className="w-[300px]">
            <p>Validar e-mail</p>
            <p>Lo usarás para recuperar tu cuenta.</p>
          </div>
          <div>
            <button
              className="px-4 py-2 bg-blue-400 rounded cursor-pointer disabled:bg-gray-200"
              onClick={() => {
                navigate("/create-account/email-verification");
              }}
              disabled={userInfo.email.length > 6}
            >
              Validar
            </button>
          </div>
        </div>
        <div className="flex gap-3 px-3 py-5 my-2 border border-gray-200 rounded">
          <div className="rounded-full border size-max p-2">
            <svg fill="currentColor" className="size-5" viewBox="0 0 16 16">
              <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
            </svg>
          </div>
          <div className="w-[300px]">
            <p>Completar tu perfil</p>
            <p>Elige cómo quieres que te llamemos.</p>
          </div>
          <div>
            <button
              className="px-4 py-2 bg-blue-400 rounded cursor-pointer disabled:bg-gray-200"
              onClick={() => {
                navigate("/create-account/personal-info");
              }}
              disabled={userInfo.first_name.length > 3 || userInfo.last_name.length > 3}
            >
              Validar
            </button>
          </div>
        </div>
        <div className="flex gap-3 px-3 py-5 my-2 border border-gray-200 rounded">
          <div className="rounded-full border size-max p-2">
            <svg fill="currentColor" className="size-5" viewBox="0 0 16 16">
              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
              <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
            </svg>
          </div>
          <div className="w-[300px]">
            <p>Crear contraseña</p>
            <p>Servirá para ingresar a tu cuenta.</p>
          </div>
          <div>
            <button
              className="px-4 py-2 bg-blue-400 rounded cursor-pointer disabled:bg-gray-200"
              onClick={() => {
                navigate("/create-account/create-password");
              }}
              disabled={userInfo.password.length > 8}
            >
              Validar
            </button>
          </div>
        </div>
      </div>
      <button
        className="w-full px-4 py-2 bg-blue-400 rounded cursor-pointer disabled:bg-gray-200"
        onClick={() => {
          createAccount();
        }}
        disabled={false}
      >
        Crear Cuenta
      </button>
    </div>
  );
};

export default Requirements;
