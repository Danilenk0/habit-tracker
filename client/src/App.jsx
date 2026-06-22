import "./App.css";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import useAlertStack from "./hooks/useAlertStack";
import AlertStack from "./components/alertStack/AlertStack";
import useAuth from "./hooks/useAuth";
import Plus from "./components/icons/PlusIcon";
import NoHabit from "./components/noHabit/NoHabit";
import HabitModal from "./components/habitModal/HabitModal";
import HabitCard from "./components/habitCard/HabitCard";
import instance from "./axios";

function App() {
  const { user, checkAuth } = useAuth();
  const [alerts, addAlert] = useAlertStack();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [habits, setHabits] = useState([]);
  const [modalMode, setModalMode] = useState("");
  const [editableHabit, setEditableHabit] = useState({});
  useEffect(() => {
    checkAuth();
    getHabits();
  }, []);

  const toggleModal = (mode = "", habit = null) => {
    setModalMode(mode);

    if (habit) {
      setEditableHabit(habit);
    } else {
      setEditableHabit({});
    }

    setIsOpenModal((prev) => !prev);
  };

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    try {
      if (modalMode === "edit") {
        await instance.put(`/habits/${editableHabit._id}`, formData);
        addAlert("Habit successfully edited!", "success");
      } else {
        await instance.post("/habits", formData);
        addAlert("Habit successfully added!", "success");
      }

      getHabits();
      setIsOpenModal(false);
    } catch (err) {
      addAlert(err.message, "error");
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await instance.delete(`/habits/${id}`);
      addAlert("Habit successfully deleted!!", "success");
      setHabits(habits.filter((item) => item._id !== id));
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
      <HabitModal
        isOpen={isOpenModal}
        modalMode={modalMode}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
        editableHabit={editableHabit}
      />
      <Header />
      <main className="main">
        <div className="habits-header">
          <div className="header-text">
            <h2>My habits</h2>
            <p>Track your daily habits and build consistency Add Habit</p>
          </div>
          <button
            onClick={() => toggleModal("add")}
            className={`btn btn__black`}
          >
            <Plus width={18} height={18} />
            <p>Add Habit</p>
          </button>
        </div>
        {habits.length == 0 ? (
          <NoHabit toggleAddModal={() => toggleModal("add")} />
        ) : (
          <section className="card-container">
            {habits.map((item) => (
              <HabitCard
                key={item._id}
                habit={item}
                handleDeleteHabit={handleDeleteHabit}
                toggleModal={toggleModal}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
