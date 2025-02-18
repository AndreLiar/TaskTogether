//src/controllers/taskController.js

const taskService = require("../services/taskService");

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, projectId } = req.body;
        const task = await taskService.createTask(projectId, title, description);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tasks for a project
const getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await taskService.getTasks(projectId);
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single task
const getTask = async (req, res) => {
    try {
        const { taskId, projectId } = req.params;
        const task = await taskService.getTask(taskId, projectId);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Assign a task to a user
const assignTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { userId } = req.body;
        const task = await taskService.assignTask(taskId, userId);
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update task status
const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const task = await taskService.updateTaskStatus(taskId, status);
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await taskService.deleteTask(taskId);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTask, getTasks, getTask, assignTask, updateTaskStatus, deleteTask };
