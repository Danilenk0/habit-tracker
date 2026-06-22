import express from "express";
import auth from "../middleware/auth.js";
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} from "../controllers/habitsController.js";

const router = express.Router();

router.post("/", auth, createHabit);
router.get("/", auth, getHabits);
router.put("/:id", auth, updateHabit);
router.delete("/:id", auth, deleteHabit);

export default router;
