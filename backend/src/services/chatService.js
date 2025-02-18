//src/services/chatService.js

const chatRepository = require("../repositories/chatRepository");

// Save a new message
const saveMessage = async (senderId, projectId, content) => {
    return await chatRepository.saveMessage({
        senderId,
        projectId,
        content
    });
};

// Get chat history for a project
const getChatHistory = async (projectId) => {
    return await chatRepository.getChatHistory(projectId);
};

module.exports = { saveMessage, getChatHistory };
