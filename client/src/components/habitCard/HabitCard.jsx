import style from "./HabitCard.module.css";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import CheckIcon from "../icons/CheckIcon";
import ArrowIcon from "../icons/ArrowIcons";
import FireIcon from "../icons/FireIcon";

const HabitCard = ({
  habit,
  handleDeleteHabit,
  toggleModal,
  toggleDay,
  getStreak,
}) => {
  const getWeekDays = () => {
    const today = new Date();

    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const days = ["S", "M", "T", "W", "T", "F", "S"];

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      return {
        label: days[date.getDay()],
        day: date.getDate(),
        fullDate: date.toISOString().split("T")[0],
        isToday: date.toDateString() === today.toDateString(),
      };
    });
  };

  const week = getWeekDays();
  const weekCompleted = week.filter((d) =>
    habit.completedDays?.includes(d.fullDate),
  ).length;

  return (
    <div className={style.card}>
      <header className={style.header}>
        <div className={style.headerContent}>
          <div className={style.title}>
            <div style={{ backgroundColor: habit.color }}></div>
            <p>{habit.name}</p>
          </div>
          <p>{habit.description}</p>
        </div>
        <div className={style.buttons}>
          <button onClick={() => toggleModal("edit", habit)}>
            <EditIcon width={16} height={16} />
          </button>
          <button onClick={() => handleDeleteHabit(habit._id)}>
            <DeleteIcon width={16} height={16} />
          </button>
        </div>
      </header>
      <main className={style.main}>
        <div className={style.habitMeta}>
          <p>{habit.frequency}</p>
          {habit.time && <p>{habit.time}</p>}
          {getStreak(habit.completedDays) !== 0 && (
            <div className={style.streak}>
              <FireIcon width={17} height={17} />
              <p>{getStreak(habit.completedDays)} day</p>
            </div>
          )}
        </div>
        <button
          onClick={() =>
            toggleDay(habit, new Date().toISOString().split("T")[0])
          }
          className={`${style.todayComplete} ${habit.completedDays.includes(new Date().toISOString().split("T")[0]) ? style["todayComplete__complete"] : ""}`}
        >
          <CheckIcon width={18} height={18} />
          <p>Complete for today</p>
        </button>
        <div className={style.week}>
          <p>This week {weekCompleted}/7</p>
          <div className={style.weekGalary}>
            {week.map((d) => (
              <button
                key={d.fullDate}
                onClick={() => {
                  toggleDay(habit, d.fullDate);
                }}
                className={`${style.day} ${d.isToday ? style.today : ""} ${habit.completedDays?.includes(d.fullDate) ? style.completed : ""}`}
              >
                <span>{d.label}</span>
                <span>{d.day}</span>
              </button>
            ))}
          </div>
        </div>
        <button className={style.statistic}>
          <ArrowIcon width={18} height={18} />
          <p>View Statistics</p>
        </button>
      </main>
    </div>
  );
};

export default HabitCard;
