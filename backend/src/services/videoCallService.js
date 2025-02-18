//src/services/videoCallService.js

const videoCallRepository = require("../repositories/videoCallRepository");

// Generate a Jitsi Meeting URL
const generateJitsiRoomLink = (projectId) => {
    return `https://meet.jit.si/${projectId}-${Date.now()}`;
};

// Start a new video call
const startVideoCall = async (hostId, projectId) => {
    const roomUrl = generateJitsiRoomLink(projectId);

    return await videoCallRepository.createVideoCall({
        hostId,
        projectId,
        roomUrl
    });
};

// Get video call history for a project
const getVideoCallHistory = async (projectId) => {
    return await videoCallRepository.getVideoCallsByProject(projectId);
};

module.exports = { startVideoCall, getVideoCallHistory };
