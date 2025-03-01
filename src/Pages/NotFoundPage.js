import { Link } from "react-router-dom";

import NotFound from "../assets/NotFound.jpg";

const NotFoundPage = () => {
  return (
    <div
      className={`relative w-full h-[calc(100vh-104px-72px)] mx-auto bg-[url(${NotFound})] bg-cover bg-center bg-no-repeat`}
    >
      <div className="flex items-center absolute left-45 bottom-75 w-max px-2 py-4 rounded-lg bg-yellow-200">
        <div className="mx-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="size-25 text-yellow-900"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708m5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708M8 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4" />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-4xl font-semibold">¡Direccion no encontrada!</p>
          <div className="p-1 ms-1">
            <p className="text-xl">
              La direccion que intentas ingresas no fue encontrada
            </p>
            <Link to={"/"} className="text-lg font-semibold hover:underline">
              Volver a la pagina principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
