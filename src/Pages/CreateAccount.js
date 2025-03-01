import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import BrandTitle from "../Components/BrandTitle";
import Landing from "../Components/Landing";
import Requirements from "../Components/Requirements";
import EmailVerification from "../Components/EmailVerification";
import PersonalInfo from "../Components/PersonalInfo";
import CreatePassword from "../Components/CreatePassword";
import Done from "../Components/Done";

// TODO Cambiar edad por fecha de nacimiento
const CreateAccount = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    first_name: "",
    last_name: "",
    age: "",
    password: "",
    roles: ["USER"],
    cart: "",
    favorite_products: [],
    tac: false,
  });

  const handlingUserInfo = (status) => {
    setUserInfo((data) => {
      return { ...data, ...status };
    });
  };

  useEffect(() => {
    if (!userInfo.tac) navigate("/create-account/landing");
  }, [userInfo]);

  return (
    <>
      <header className="bg-yellow-200">
        <div className="grid grid-cols-12 items-end w-[1280px] mx-auto">
          <div className="col-span-3 flex justify-end">
            <BrandTitle />
          </div>
        </div>
      </header>
      <div className="flex justify-center w-full h-[120px] pt-[40px] bg-yellow-200">
        <div className="flex h-max w-[500px] px-5 py-7 bg-white shadow-xl">
          <Routes>
            <Route
              path="/landing"
              element={<Landing handlingUserInfo={handlingUserInfo} />}
            ></Route>
            <Route
              path="/requirements"
              element={<Requirements userInfo={userInfo} />}
            ></Route>
            <Route
              path="/email-verification"
              element={
                <EmailVerification handlingUserInfo={handlingUserInfo} />
              }
            ></Route>
            <Route
              path="/personal-info"
              element={<PersonalInfo handlingUserInfo={handlingUserInfo} />}
            ></Route>
            <Route
              path="/create-password"
              element={<CreatePassword handlingUserInfo={handlingUserInfo} />}
            ></Route>
            <Route path="done" element={<Done />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
