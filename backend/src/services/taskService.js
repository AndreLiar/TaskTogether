
//src/services/taskService.js
const taskRepository = require("../repositories/taskRepository");

// Create a task
const createTask = async (projectId, title, description) => {
    return await taskRepository.createTask({ projectId, title, description });
};

// Get all tasks for a project
const getTasks = async (projectId) => {
    return await taskRepository.getTasksByProject(projectId);
};

// Get a single task
const getTask = async (taskId, projectId) => {
    return await taskRepository.getTaskById(taskId, projectId);
};

// Assign a task to a user
const assignTask = async (taskId, userId) => {
    return await taskRepository.assignTask(taskId, userId);
};

// Update task status (Kanban)
const updateTaskStatus = async (taskId, status) => {
    return await taskRepository.updateTaskStatus(taskId, status);
};

// Delete a task
const deleteTask = async (taskId) => {
    return await taskRepository.deleteTask(taskId);
};

module.exports = { createTask, getTasks, getTask, assignTask, updateTaskStatus, deleteTask };
