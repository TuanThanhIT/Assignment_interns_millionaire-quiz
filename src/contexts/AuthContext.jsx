import { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [prize, setPrize] = useState();
  const [storageAnswer, setStorageAnswer] = useState([]);

  const login = (userName) => {
    setUser(userName);
    setPrize(-1);
  };

  const logout = () => {
    setUser("");
    setPrize();
    setStorageAnswer([]);
  };

  const updatePrize = (moneyIndex) => {
    setPrize(moneyIndex);
  };

  const value = {
    user,
    login,
    logout,
    prize,
    updatePrize,
    storageAnswer,
    setStorageAnswer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
