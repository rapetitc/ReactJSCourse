import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailVerification.css";

const EmailVerification = ({ caStatus }) => {
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].validity.valid) {
      localStorage.setItem("caStatus", JSON.stringify({ ...caStatus, e: e.target[0].value }));
      navigate("/create-account");
    }
  };

  useEffect(() => {
    if (caStatus.TaC === false) {
      navigate("/create-account");
    }
  }, [caStatus, navigate]);

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
