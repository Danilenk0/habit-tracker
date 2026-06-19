import "./App.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import useAlertStack from "./hooks/useAlertStack";
import AlertStack from "./components/alertStack/AlertStack";
import instance from "./axios";
import useAuth from "./hooks/useAuth";

function App() {
  const { user, checkAuth } = useAuth();
  const [alerts] = useAlertStack();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <AlertStack alerts={alerts} />
      <Header />
      <main className="main"></main>
    </div>
  );
}

export default App;
