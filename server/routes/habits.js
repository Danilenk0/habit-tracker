const express = require('express');
const auth = require('../middleware/auth');
const { createHabit, getHabits, updateHabit, deleteHabit } = require('../controllers/habitsController');

const router = express.Router();

router.post('/', auth, createHabit);
router.get('/', auth, getHabits);
router.patch('/:id', auth, updateHabit);
router.delete('/:id', auth, deleteHabit);

module.exports = router;
