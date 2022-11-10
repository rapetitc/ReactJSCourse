import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePassword.css";

const CreatePassword = ({ profile, setProfile }) => {
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value.length);
    if (e.target[0].value.length > 4) {
      setProfile({ ...profile, password: e.target[0].value });
      navigate("/create-account/done");
    }
  };

  return (
    <div className="CreatePassword_Container">
      <h4>Genera tu contraseña</h4>
      <p>Estas a solo un paso, genera la mas fuerte combinacion</p>
      <form onSubmit={handlingSubmit}>
        <input type={"password"} placeholder={"Contraseña"} required />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default CreatePassword;
