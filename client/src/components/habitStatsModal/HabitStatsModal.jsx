import { createPortal } from "react-dom";
import style from "./HabitStatsModal.module.css";
import XIcon from "../icons/XIcons";
import FireIcon from "../icons/FireIcon";

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

const HabitStatsModal = ({ isOpen, toggleStats, habit }) => {
  const root = document.getElementById("portal-root");

  if (!root || !habit) return null;

  const completedDays = habit.completedDays || [];
  const totalDays = completedDays.length;
  const currentStreak = getStreak(completedDays);

  // This week stats
  const weekDates = getWeekDates();
  const weekCompleted = completedDays.filter((day) =>
    weekDates.includes(day),
  ).length;

  // This month stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthCompleted = completedDays.filter((day) => {
    const date = new Date(day);
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  }).length;

  // All-time completion rate (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  });
  const completedInLast30 = last30Days.filter((day) =>
    completedDays.includes(day),
  ).length;
  const completionRate30 = Math.round((completedInLast30 / 30) * 100);

  // This week progress %
  const weekProgress = Math.round((weekCompleted / 7) * 100);

  return createPortal(
    <div className={`${style.wrapper} ${isOpen ? "" : style.hidden}`}>
      <div className={style.container}>
        <button onClick={toggleStats} className={style.closeModal}>
          <XIcon width={18} height={18} />
        </button>

        <div className={style.header}>
          <div
            className={style.colorDot}
            style={{ backgroundColor: habit.color || "#3498db" }}
          />
          <h3>{habit.name}</h3>
        </div>
        {habit.description && (
          <p className={style.description}>{habit.description}</p>
        )}

        <div className={style.statsGrid}>
          <div className={style.statCard}>
            <p className={style.statValue}>{currentStreak}</p>
            <p className={style.statLabel}>Current Streak</p>
          </div>
          <div className={style.statCard}>
            <p className={style.statValue}>{totalDays}</p>
            <p className={style.statLabel}>Total Days</p>
          </div>
          <div className={style.statCard}>
            <p className={style.statValue}>{weekCompleted}/7</p>
            <p className={style.statLabel}>This Week</p>
          </div>
          <div className={style.statCard}>
            <p className={style.statValue}>{monthCompleted}</p>
            <p className={style.statLabel}>This Month</p>
          </div>
        </div>

        <div className={style.progressSection}>
          <p className={style.progressLabel}>
            <span>This Week Progress</span>
            <span>{weekProgress}%</span>
          </p>
          <div className={style.progressBar}>
            <div
              className={style.progressFill}
              style={{
                width: `${weekProgress}%`,
                backgroundColor: habit.color || "#3498db",
              }}
            />
          </div>
        </div>

        <div className={style.progressSection}>
          <p className={style.progressLabel}>
            <span>30-Day Completion Rate</span>
            <span>{completionRate30}%</span>
          </p>
          <div className={style.progressBar}>
            <div
              className={style.progressFill}
              style={{
                width: `${completionRate30}%`,
                backgroundColor: habit.color || "#3498db",
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    root,
  );
};

export default HabitStatsModal;
