import style from "./NoHabit.module.css";
import Plus from "../icons/Plus";

const NoHabit = () => {
  return (
    <section className={style.noHabit}>
      <div>
        <p>No Habits yet. Start building better habits today!</p>
        <button className="btn btn__black">
          <Plus width={18} height={18} />
          <p>Add Your First Habit</p>
        </button>
      </div>
    </section>
  );
};

export default NoHabit;
