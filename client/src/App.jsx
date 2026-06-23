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
import ProgressCard from "./components/ProgressCard/ProgressCard";
import ArrowIcon from "./components/icons/ArrowIcons";
import SparklesIcon from "./components/icons/SparklesIcon";
import CalendarIcon from "./components/icons/CalendarIcon";
import FireIcon from "./components/icons/FireIcon";
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
      console.log(response.data);
      setHabits(response.data);
    } catch (error) {
      addAlert(
        error?.response?.data?.mesage || error?.message || "Unknown error",
      );
    }
  };

  const toggleDay = async (habit, date) => {
    try {
      const response = await instance.put(`/habits/${habit._id}/toggle-day`, {
        date,
      });

      setHabits((prev) =>
        prev.map((h) => (h._id === habit._id ? response.data : h)),
      );
    } catch (error) {
      addAlert(
        error?.response?.data?.message || error?.message || "unknown error",
        "error",
      );
    }
  };
  const today = new Date().toISOString().split("T")[0];

  const completedToday = habits.filter((habit) =>
    habit.completedDays?.includes(today),
  ).length;

  const todayProgress = habits.length
    ? Math.round((completedToday / habits.length) * 100)
    : 0;
  const getWeekDates = () => {
    const today = new Date();

    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      return date.toISOString().split("T")[0];
    });
  };

  const weekDates = getWeekDates();

  const weekCompletions = habits.reduce((sum, habit) => {
    return (
      sum +
      (habit.completedDays?.filter((day) => weekDates.includes(day)).length ||
        0)
    );
  }, 0);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthCompletions = habits.reduce((sum, habit) => {
    const count =
      habit.completedDays?.filter((day) => {
        const date = new Date(day);

        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      }).length || 0;

    return sum + count;
  }, 0);
  const getStreak = (completedDays) => {
    if (!completedDays?.length) return 0;

    const daysSet = new Set(completedDays);

    let current = new Date();
    let streak = 0;

    const today = current.toISOString().split("T")[0];

    if (!daysSet.has(today)) {
      current.setDate(current.getDate() - 1);
    }
    while (true) {
      const dateStr = current.toISOString().split("T")[0];

      if (!daysSet.has(dateStr)) break;

      streak++;
      current.setDate(current.getDate() - 1);
    }

    return streak;
  };
  const bestStreak = Math.max(
    ...habits.map((habit) => getStreak(habit.completedDays)),
    0,
  );
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
        <section className="progress-galary">
          <ProgressCard
            name="Today's Progress"
            description={`${completedToday}/${habits.length} habits completed`}
            progress={`${todayProgress}%`}
          >
            <SparklesIcon width={18} height={18} />
          </ProgressCard>

          <ProgressCard
            name="This Week"
            description="Total completions"
            progress={weekCompletions}
          >
            <CalendarIcon width={18} height={18} />
          </ProgressCard>

          <ProgressCard
            name="This Month"
            description="Total completions"
            progress={monthCompletions}
          >
            <ArrowIcon width={18} height={18} />
          </ProgressCard>

          <ProgressCard
            name="Best Streak"
            description="days in a row"
            progress={bestStreak}
          >
            <FireIcon
              width={18}
              height={18}
              style={{ color: "rgb(255, 105, 0) " }}
            />
          </ProgressCard>
        </section>
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
                toggleDay={toggleDay}
                getStreak={getStreak}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
