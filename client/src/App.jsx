import "./App.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import useAlertStack from "./hooks/useAlertStack";
import AlertStack from "./components/alertStack/AlertStack";
import useAuth from "./hooks/useAuth";
import Plus from "./components/icons/Plus";
import NoHabit from "./components/noHabit/NoHabit";

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
      <main className="main">
        <div className="habits-header">
          <div className="header-text">
            <h2>My habits</h2>
            <p>Track your daily habits and build consistency Add Habit</p>
          </div>
          <button className={`btn btn__black`}>
            <Plus width={18} height={18} />
            <p>Add Habit</p>
          </button>
        </div>
        <NoHabit />
      </main>
    </div>
  );
}

export default App;
