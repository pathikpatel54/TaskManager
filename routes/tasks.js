const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const Task = require('../models/task');

// GET route to retrieve all tasks for a user
router.get('/:user', async (req, res) => {
    const tasks = await Task.find({ user: req.params.user });
    res.json(tasks);
});

// POST route to add a new task
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// PUT route to update a task
router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// DELETE route to delete a task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  created_at: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
