import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function UseAuth() {
  const value = useContext(AuthContext);
  return value;
}

export default UseAuth;
