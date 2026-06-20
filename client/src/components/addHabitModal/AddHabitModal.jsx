import { createPortal } from "react-dom";
import style from "./AddHabitModal.module.css";
import XIcon from "../icons/XIcons";
import { useState } from "react";
import { InputMask } from "@react-input/mask";

const AddHabitModal = ({ isOpen, toggleModal }) => {
  const [time, setTime] = useState("");
  const root = document.getElementById("portal-root");

  if (!root) return null;

  return createPortal(
    <div className={`${style.wrapper} ${isOpen ? "" : style.hidden}`}>
      <div className={style.container}>
        <button onClick={toggleModal} className={style.closeModal}>
          <XIcon width={18} height={18} />
        </button>

        <div>
          <h3>Add New Habit</h3>
          <p>Create a new habit to track. Set reminders to stay on track.</p>
        </div>

        <form className={style.form} action="#">
          <div className={style.formGroup}>
            <label htmlFor="name">Habit Name</label>
            <input id="name" type="text" placeholder="e.g., Morning exercise" />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="What does this habit involve?"
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="frequency">Frequency</label>
            <select id="frequency">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="reminder">Reminder Time (optional)</label>

            <InputMask
              mask="__:__"
              replacement={{ _: /\d/ }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="00:00"
            ></InputMask>
          </div>
          <div className={style.footer}>
            <div className={style.formGroup}>
              <label htmlFor="color">Color</label>
              <input id="name" type="color" />
            </div>
            <div className={style.buttons}>
              <button
                onClick={toggleModal}
                className={`btn ${style.btnCancel}`}
              >
                Cancel
              </button>
              <button className={`btn btn__black ${style.btnCancel}`}>
                Add Habit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    root,
  );
};

export default AddHabitModal;
