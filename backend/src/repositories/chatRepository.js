//src/repositories/chatRepository.js

const prisma = require("../config/prisma");

// Save message to the database
const saveMessage = async (messageData) => {
    return await prisma.message.create({
        data: messageData
    });
};

// Get chat history for a project
const getChatHistory = async (projectId) => {
    return await prisma.message.findMany({
        where: { projectId },
        orderBy: { createdAt: "asc" } // Order messages by time
    });
};

module.exports = { saveMessage, getChatHistory };
