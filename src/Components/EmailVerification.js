import { useNavigate } from "react-router-dom";

//FIXME Validar si el correo ya esta associado con otro usuario
const EmailVerification = ({ handlingUserInfo }) => {
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].validity.valid) {
      handlingUserInfo({ email: e.target[0].value });
      navigate("/create-account/requirements");
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <div className=" w-full py-1 px-3">
        <button
          onClick={() => {
            navigate("/create-account/requirements");
          }}
          className="flex items-center gap-3 text-gray-900/75 cursor-pointer hover:underline"
        >
          <svg fill="currentColor" className="size-5" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
          Volver
        </button>
      </div>
      <div className="flex items-top gap-3 w-full py-3 ps-7">
        <svg fill="currentColor" className="size-8 mt-1" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
        </svg>
        <div className="w-full p-1">
          <h4 className="text-2xl">Ingresa tu correo de contacto</h4>
          <p>Asegúrate de tener acceso a él.</p>
        </div>
      </div>
      <form onSubmit={handlingSubmit} className="flex flex-wrap gap-4 p-4">
        <input
          type={"email"}
          className="w-full px-3 py-2 border rounded"
          pattern="\w+@\w+.\w{2,}"
          placeholder="Correo Electronico"
          required
        />
        <button
          type="submit"
          className="w-full px-3 py-2 bg-blue-400 rounded cursor-pointer"
        >
          Verificar correo
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
