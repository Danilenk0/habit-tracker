import "./App.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import useAlertStack from "./hooks/useAlertStack";
import AlertStack from "./components/alertStack/AlertStack";
import instance from "./axios";
import useAuth from "./hooks/useAuth";

function App() {
  const { user, setUser } = useAuth();
  const [alerts, setAlert, addAlert] = useAlertStack();
  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const response = await instance.get("/auth/me", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      addAlert(
        error?.response?.data?.message || error?.message || "Unknown error",
      );
    }
  };

  return (
    <div className="App">
      <AlertStack alerts={alerts} />
      <Header />
      <main className="main"></main>
    </div>
  );
}

export default App;
