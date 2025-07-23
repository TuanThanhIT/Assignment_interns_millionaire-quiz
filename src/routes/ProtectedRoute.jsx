import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
export default ProtectedRoute;
