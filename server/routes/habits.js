import express from "express";
import auth from "../middleware/auth.js";
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  toggleDay,
} from "../controllers/habitsController.js";

const router = express.Router();

router.post("/", auth, createHabit);
router.get("/", auth, getHabits);
router.put("/:id", auth, updateHabit);
router.delete("/:id", auth, deleteHabit);
router.put("/:id/toggle-day", auth, toggleDay);

export default router;
