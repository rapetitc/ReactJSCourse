import React, { useEffect, useState } from "react";
import { useHref, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./CreateAccount.css";
import { db } from "../../DB/DB";

import Landing from "./Landing/Landing";
import Requirements from "./Requirements/Requirements";
import EmailVerification from "./EmailVerification/EmailVerification";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import CreatePassword from "./CreatePassword/CreatePassword.js";

const CreateAccount = () => {
  const [element, setElement] = useState(<></>);
  const [requirements, setRequirements] = useState({ TaC: false, emailVerification: false, personalInfo: false, password: false });
  const [profile, setProfile] = useState({ TaC: null, email: null, fname: null, lname: null, password: null });

  const navigate = useNavigate();
  const currentLocation = useHref();

  const creatingAccount = async (db, data) => {
    const dc = collection(db, "users");
    const docRef = await addDoc(dc, {
      TaC: data.TaC,
      email: data.email,
      fname: data.fname,
      lname: data.lname,
      password: data.password,
      datecreation: serverTimestamp(),
    });
    console.log(docRef.id);
  };

  const handlingRequirements = (currentLocation) => {
    console.log(currentLocation);
    if (requirements.TaC === false) {
      if (currentLocation === "/create-account/landing") {
        setElement(<Landing setRequirements={setRequirements} requirements={requirements} profile={profile} setProfile={setProfile} />);
      } else {
        navigate("/create-account/landing");
      }
    } else {
      if (currentLocation === "/create-account/requirements") {
        setElement(<Requirements />);
      } else if (currentLocation === "/create-account/email-verification") {
        setElement(<EmailVerification profile={profile} setProfile={setProfile} />);
      } else if (currentLocation === "/create-account/personal-info") {
        setElement(<PersonalInfo profile={profile} setProfile={setProfile} />);
      } else if (currentLocation === "/create-account/create-password") {
        setElement(<CreatePassword profile={profile} setProfile={setProfile} />);
      } else if (currentLocation === "/create-account/done") {
        creatingAccount(db, profile);
      } else {
        navigate("/create-account/requirements");
      }
    }
  };

  useEffect(() => {
    handlingRequirements(currentLocation);
  }, [currentLocation]);
  return <div className="CreateAccount_Container fluid-container">{element}</div>;
};

export default CreateAccount;
