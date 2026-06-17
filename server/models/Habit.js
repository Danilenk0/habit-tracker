import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly"],
    default: "daily",
  },
  color: {
    type: String,
    default: "#3498db",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Habit", habitSchema);
