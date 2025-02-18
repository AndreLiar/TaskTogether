//src/routes/videoCallRoutes.js

const express = require("express");
const videoCallController = require("../controllers/videoCallController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Video Calls
 *   description: Video call management endpoints
 */

/**
 * @swagger
 * /video/start:
 *   post:
 *     summary: Start a new video call
 *     tags: [Video Calls]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Video call started successfully
 */
router.post("/start", authenticateUser, videoCallController.startVideoCall);

/**
 * @swagger
 * /video/{projectId}:
 *   get:
 *     summary: Get video call history for a project
 *     tags: [Video Calls]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of video calls for the project
 */
router.get("/:projectId", authenticateUser, videoCallController.getVideoCallHistory);

module.exports = router;
