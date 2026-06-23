import Habit from "../models/Habit.js";

const createHabit = async (req, res) => {
  try {
    const { name, description, frequency, color } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (frequency && !["daily", "weekly"].includes(frequency)) {
      return res
        .status(400)
        .json({ message: 'Frequency must be "daily" or "weekly"' });
    }

    const habit = new Habit({
      userId: req.userId,
      name,
      description: description || "",
      frequency: frequency || "daily",
      color: color || "#3498db",
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, frequency, color } = req.body;

    const habit = await Habit.findOne({ _id: id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    if (name) habit.name = name;
    if (description !== undefined) habit.description = description;
    if (frequency && ["daily", "weekly"].includes(frequency))
      habit.frequency = frequency;
    if (color) habit.color = color;

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOneAndDelete({ _id: id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json({ message: "Habit deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleDay = async (req, res) => {
  try {
    const { date } = req.body;
    const { id } = req.params;

    const habit = await Habit.findOne({ _id: id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const exists = habit.completedDays.includes(date);

    if (exists) {
      habit.completedDays = habit.completedDays.filter((d) => d !== date);
    } else {
      habit.completedDays.push(date);
    }

    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createHabit, getHabits, updateHabit, deleteHabit, toggleDay };
