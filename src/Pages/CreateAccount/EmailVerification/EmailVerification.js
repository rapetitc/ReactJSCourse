import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmailVerification.css";

const EmailVerification = ({ profile, setProfile }) => {
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].validity.valid) {
      setProfile({ ...profile, email: e.target[0].value });
      navigate("/create-account/requirements");
    }
    console.log();
  };

  return (
    <div className="EmailVerification_Container">
      <h4>Ingresa tu correo de contacto</h4>
      <p>Asegúrate de tener acceso a él.</p>
      <form onSubmit={handlingSubmit}>
        <input type={"email"} placeholder="Correo Electronico" required />
        <button type="submit">Verificar correo</button>
      </form>
    </div>
  );
};

export default EmailVerification;
