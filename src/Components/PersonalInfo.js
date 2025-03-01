import { useNavigate } from "react-router-dom";

const PersonalInfo = ({ handlingUserInfo }) => {
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    if (
      e.target[0].value.length > 3 &&
      e.target[1].value.length > 3 &&
      Number(e.target[2].value) !== NaN
    ) {
      handlingUserInfo({
        first_name: e.target[0].value,
        last_name: e.target[1].value,
        age: e.target[2].value,
      });
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
          <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
        </svg>
        <div className="w-full p-1">
          <h4 className="text-2xl">Ahora rellena tu perfil!</h4>
          <p>Como quieres que te llamemos?</p>
        </div>
      </div>
      <form onSubmit={handlingSubmit} className="flex flex-wrap gap-4 p-4">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          pattern="\w{3,}"
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          pattern="\w{3,}"
          placeholder="Apellido"
          required
        />
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          pattern="[0-9]+"
          placeholder="Edad"
          required
        />
        <button
          type="submit"
          className="w-full px-3 py-2 bg-blue-400 rounded cursor-pointer"
        >
          Continar
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
