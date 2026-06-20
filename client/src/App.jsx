import "./App.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import useAlertStack from "./hooks/useAlertStack";
import AlertStack from "./components/alertStack/AlertStack";
import useAuth from "./hooks/useAuth";
import Plus from "./components/icons/Plus";
import NoHabit from "./components/noHabit/NoHabit";
import AddHabitModal from "./components/addHabitModal/AddHabitModal";

function App() {
  const { user, checkAuth } = useAuth();
  const [alerts] = useAlertStack();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  useEffect(() => {
    checkAuth();
  }, []);

  const toggleAddModal = () => {
    setIsOpenAddModal((prev) => !prev);
  };

  return (
    <div className="App">
      <AlertStack alerts={alerts} />
      <AddHabitModal isOpen={isOpenAddModal} toggleModal={toggleAddModal} />
      <Header />
      <main className="main">
        <div className="habits-header">
          <div className="header-text">
            <h2>My habits</h2>
            <p>Track your daily habits and build consistency Add Habit</p>
          </div>
          <button onClick={toggleAddModal} className={`btn btn__black`}>
            <Plus width={18} height={18} />
            <p>Add Habit</p>
          </button>
        </div>
        <NoHabit toggleAddModal={toggleAddModal} />
      </main>
    </div>
  );
}

export default App;
