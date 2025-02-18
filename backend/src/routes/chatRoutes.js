const express = require("express");
const chatController = require("../controllers/chatController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat messages management
 */

/**
 * @swagger
 * /chat/send:
 *   post:
 *     summary: Send a chat message
 *     tags: [Chat]
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
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 */
router.post("/send", authenticateUser, chatController.sendMessage);

/**
 * @swagger
 * /chat/{projectId}:
 *   get:
 *     summary: Get chat history for a project
 *     tags: [Chat]
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
 *         description: List of chat messages
 */
router.get("/:projectId", authenticateUser, chatController.getChatHistory);

module.exports = router;
