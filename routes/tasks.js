const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// Get all tasks for a user
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting tasks" });
    }
});

// Add a new task
router.post("/", async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new Task({ title, description, user: req.user._id });
        await task.save();
        res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating task" });
    }
});

// Edit a task
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await Task.findById(id);
        if (task) {
            task.title = title || task.title;
            task.description = description || task.description;
            await task.save();
            res.json({ message: "Task updated successfully", task });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating task" });
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (task) {
            await task.remove();
            res.json({ message: "Task deleted successfully", task });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting task" });
    }
});

module.exports = router;
