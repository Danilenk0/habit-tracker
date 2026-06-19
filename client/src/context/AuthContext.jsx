import { createContext, useState } from "react";
import useAlertStack from "../hooks/useAlertStack";
import instance from "../axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [, , addAlert] = useAlertStack();
  const checkAuth = async () => {
    try {
      const response = await instance.get("/auth/me", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      setUser(null);
      addAlert(
        error?.response?.data?.message || error?.message || "Unknown error",
      );
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
