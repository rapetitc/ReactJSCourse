import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import SessionContext from "../Context/SessionContext";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { session } = useContext(SessionContext);

  const checkRoles = () => {
    if (allowedRoles == "ONLYPUBLIC" && session == null) return true;
    let isAllowed = false;
    session?.user.roles.forEach((role) => {
      if (allowedRoles.includes(role)) isAllowed = true;
    });
    return isAllowed;
  };

  if (checkRoles()) return <Outlet />;
  return <Navigate to={"/not-found"} />;
};

export default ProtectedRoute;
