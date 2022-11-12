import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePassword.css";

const CreatePassword = ({ caStatus }) => {
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value.length);
    if (e.target[0].value.length > 4) {
      localStorage.setItem("caStatus", JSON.stringify({ ...caStatus, p: e.target[0].value }));
      navigate("/create-account");
    }
  };

  useEffect(() => {
    if (caStatus.TaC === false) {
      navigate("/create-account");
    }
  }, [caStatus, navigate]);

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
