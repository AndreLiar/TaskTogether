//src/repositories/taskRepository.js
const prisma = require("../config/prisma");

// Create a task
const createTask = async (taskData) => {
    return await prisma.task.create({
        data: taskData
    });
};

// Get all tasks for a project
const getTasksByProject = async (projectId) => {
    return await prisma.task.findMany({
        where: { projectId }
    });
};

// Get a single task by ID
const getTaskById = async (taskId, projectId) => {
    return await prisma.task.findFirst({
        where: { id: taskId, projectId }
    });
};

// Assign a task to a user
const assignTask = async (taskId, userId) => {
    return await prisma.task.update({
        where: { id: taskId },
        data: { assigneeId: userId }
    });
};

// Update task status
const updateTaskStatus = async (taskId, status) => {
    return await prisma.task.update({
        where: { id: taskId },
        data: { status }
    });
};

// Delete a task
const deleteTask = async (taskId) => {
    return await prisma.task.delete({
        where: { id: taskId }
    });
};

module.exports = { createTask, getTasksByProject, getTaskById, assignTask, updateTaskStatus, deleteTask };
