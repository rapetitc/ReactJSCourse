import { Outlet } from "react-router-dom";

import NavBar from "./Navbar";
import Footer from "./Footer";

const Common = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar />
      <div className={`flex-1 w-full`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Common;
