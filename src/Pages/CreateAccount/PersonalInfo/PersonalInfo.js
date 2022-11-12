import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css";

const PersonalInfo = ({ caStatus }) => {
  const navigate = useNavigate();

  const handlingSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value.length, e.target[1].value.length);
    if (e.target[0].value.length > 3 && e.target[1].value.length > 3) {
      localStorage.setItem("caStatus", JSON.stringify({ ...caStatus, pi: { fname: e.target[0].value, lname: e.target[1].value } }));
      navigate("/create-account");
    }
  };

  useEffect(() => {
    if (caStatus.TaC === false) {
      navigate("/create-account");
    }
  }, [caStatus, navigate]);

  return (
    <div className="PersonalInfo_Container">
      <h4>Ahora rellena tu perfil!</h4>
      <p>Como quieres que te llamemos?</p>
      <form onSubmit={handlingSubmit}>
        <input type={"text"} placeholder={"Nombre"} required />
        <input type={"text"} placeholder={"Apellido"} required />
        <button type="submit">Continar</button>
      </form>
    </div>
  );
};

export default PersonalInfo;
