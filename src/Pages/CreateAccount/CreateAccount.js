import React, { useEffect, useState } from "react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import "./CreateAccount.css";

import Landing from "./Landing/Landing";
import Requirements from "./Requirements/Requirements";
import EmailVerification from "./EmailVerification/EmailVerification";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import CreatePassword from "./CreatePassword/CreatePassword";
import Done from "./Done/Done";

const CreateAccount = () => {
  const [caStatus, setCAStatus] = useState("");
  const navigate = useNavigate();
  const currentLocation = useHref();

  const rLocations = (location) => {
    const rLocations = ["/create-account/email-verification", "/create-account/personal-info", "/create-account/create-password", "/create-account/done"];
    let result = false;
    rLocations.forEach((e) => {
      if (e === location) {
        result = true;
      }
    });
    return result;
  };

  useEffect(() => {
    const defaultRequirements = { TaC: false, e: false, pi: false, p: false };

    const handlingRequirements = (currentLocation) => {
      const caStatus = localStorage.getItem("caStatus");

      if (caStatus === null) {
        localStorage.setItem("caStatus", JSON.stringify(defaultRequirements));
      } else {
        let tempRequirements = JSON.parse(caStatus);
        setCAStatus(tempRequirements);

        if (tempRequirements.TaC === false) {
          if (currentLocation !== "/create-account/landing") {
            navigate("/create-account/landing");
          }
        } else if (rLocations(currentLocation)) {
        } else {
          if (currentLocation !== "/create-account/requirements") {
            navigate("/create-account/requirements");
          }
        }
      }
    };
    handlingRequirements(currentLocation);
  }, [navigate, currentLocation]);

  return (
    <div className="CreateAccount_Container fluid-container">
      <Routes>
        <Route path="landing" element={<Landing caStatus={caStatus} />}></Route>
        <Route path="requirements" element={<Requirements caStatus={caStatus} />}></Route>
        <Route path="email-verification" element={<EmailVerification caStatus={caStatus} />}></Route>
        <Route path="personal-info" element={<PersonalInfo caStatus={caStatus} />}></Route>
        <Route path="create-password" element={<CreatePassword caStatus={caStatus} />}></Route>
        <Route path="done" element={<Done />}></Route>
      </Routes>
    </div>
  );
};

export default CreateAccount;
