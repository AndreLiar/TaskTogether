//src/controllers/videoCallController.js

const videoCallService = require("../services/videoCallService");

// Start a video call
const startVideoCall = async (req, res) => {
    try {
        const { projectId } = req.body;
        const hostId = req.user.id;

        const videoCall = await videoCallService.startVideoCall(hostId, projectId);
        res.status(201).json(videoCall);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get video call history
const getVideoCallHistory = async (req, res) => {
    try {
        const { projectId } = req.params;
        const calls = await videoCallService.getVideoCallHistory(projectId);
        res.json(calls);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { startVideoCall, getVideoCallHistory };
