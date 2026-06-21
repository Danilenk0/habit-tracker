import "./App.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import useAlertStack from "./hooks/useAlertStack";
import AlertStack from "./components/alertStack/AlertStack";
import useAuth from "./hooks/useAuth";
import Plus from "./components/icons/Plus";
import NoHabit from "./components/noHabit/NoHabit";
import AddHabitModal from "./components/addHabitModal/AddHabitModal";
import HabitCard from "./components/habitCard/HabitCard";
import instance from "./axios";

function App() {
  const { user, checkAuth } = useAuth();
  const [alerts, addAlert] = useAlertStack();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [habits, setHabits] = useState([]);
  useEffect(() => {
    checkAuth();
    getHabits();
  }, []);

  const toggleAddModal = () => {
    setIsOpenAddModal((prev) => !prev);
  };

  const handleAddHabit = async (e, formData, setFormData) => {
    try {
      const response = await instance.post("/habits", formData, {
        withCredentials: true,
      });
      setHabits([...habits, formData]);
      setFormData({
        name: "",
        description: "",
        frequency: "",
        time: "",
        color: "#864bbd",
      });
    } catch (error) {
      addAlert(
        error?.response?.data?.message || error?.message || "Unknown error",
      );
    }
  };
  const getHabits = async () => {
    try {
      const response = await instance.get("/habits", {
        withCredentials: true,
      });
      setHabits(response.data);
    } catch (error) {
      addAlert(
        error?.respinse?.data?.mesage || error?.message || "Unknown error",
      );
    }
  };

  return (
    <div className="App">
      <AlertStack alerts={alerts} />
      <AddHabitModal
        isOpen={isOpenAddModal}
        toggleModal={toggleAddModal}
        handleAddHabit={handleAddHabit}
      />
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
        {habits.length == 0 ? (
          <NoHabit toggleAddModal={toggleAddModal} />
        ) : (
          <section className="card-container">
            {habits.map((item) => (
              <HabitCard key={item._id} habit={item} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
