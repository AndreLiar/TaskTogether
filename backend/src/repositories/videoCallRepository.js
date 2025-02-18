//src/repositories/videoCallRepository.js

const prisma = require("../config/prisma");

// Create a new video call entry
const createVideoCall = async (videoCallData) => {
    return await prisma.videoCall.create({
        data: videoCallData
    });
};

// Get all video calls for a project
const getVideoCallsByProject = async (projectId) => {
    return await prisma.videoCall.findMany({
        where: { projectId },
        orderBy: { createdAt: "desc" } // Show latest calls first
    });
};

module.exports = { createVideoCall, getVideoCallsByProject };
