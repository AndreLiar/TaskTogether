//src/controllers/chatController.js
const chatService = require("../services/chatService");

// Send a message
const sendMessage = async (req, res) => {
    try {
        const { projectId, content } = req.body;
        const senderId = req.user.id;

        const message = await chatService.saveMessage(senderId, projectId, content);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get chat history
const getChatHistory = async (req, res) => {
    try {
        const { projectId } = req.params;
        const messages = await chatService.getChatHistory(projectId);
        res.json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { sendMessage, getChatHistory };
