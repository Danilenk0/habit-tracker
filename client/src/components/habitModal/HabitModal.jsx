import { createPortal } from "react-dom";
import style from "./HabitModal.module.css";
import XIcon from "../icons/XIcons";
import { useState, useEffect } from "react";
import { InputMask } from "@react-input/mask";

const HabitModal = ({
  isOpen,
  toggleModal,
  handleSubmit,
  modalMode,
  editableHabit,
}) => {
  const root = document.getElementById("portal-root");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "",
    time: "",
    color: "#864bbd",
  });
  if (!root) return null;
  useEffect(() => {
    if (modalMode === "edit" && editableHabit) {
      setFormData({
        name: editableHabit?.name || "",
        description: editableHabit?.description || "",
        frequency: editableHabit?.frequency || "",
        time: editableHabit?.time || "",
        color: editableHabit?.color || "#864bbd",
      });
    }

    if (modalMode === "add") {
      setFormData({
        name: "",
        description: "",
        frequency: "daily",
        time: "",
        color: "#864bbd",
      });
    }
  }, [modalMode, editableHabit]);
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
            <input
              id="name"
              type="text"
              placeholder="e.g., Morning exercise"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="What does this habit involve?"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="frequency">Frequency</label>
            <select
              id="frequency"
              value={formData.frequency}
              onChange={(e) =>
                setFormData({ ...formData, frequency: e.target.value })
              }
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="reminder">Reminder Time (optional)</label>

            <InputMask
              mask="__:__"
              replacement={{ _: /\d/ }}
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              placeholder="00:00"
            ></InputMask>
          </div>
          <div className={style.footer}>
            <div className={style.formGroup}>
              <label htmlFor="color">Color</label>
              <input
                id="name"
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
              />
            </div>
            <div className={style.buttons}>
              <button
                onClick={toggleModal}
                className={`btn ${style.btnCancel}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e, formData);
                }}
                className={`btn btn__black ${style.btnCancel}`}
              >
                {modalMode === "edit" ? "Save Habit" : "Add Habit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    root,
  );
};

export default HabitModal;
