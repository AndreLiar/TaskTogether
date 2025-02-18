//src/routes/projectRoutes.js

const express = require("express");
const projectController = require("../controllers/projectController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a project
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created
 */
router.post("/", authenticateUser, projectController.createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects for the user
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", authenticateUser, projectController.getProjects);

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Get a single project
 *     tags: [Projects]
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
 *         description: Project details
 */
router.get("/:projectId", authenticateUser, projectController.getProject);

/**
 * @swagger
 * /projects/{projectId}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated
 */
router.put("/:projectId", authenticateUser, projectController.updateProject);

/**
 * @swagger
 * /projects/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
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
 *         description: Project deleted
 */
router.delete("/:projectId", authenticateUser, projectController.deleteProject);

/**
 * @swagger
 * /projects/{projectId}/members:
 *   post:
 *     summary: Add a member to a project
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *                 description: Role of the user in the project (e.g., "admin" or "member")
 *     responses:
 *       201:
 *         description: Member added successfully
 */
router.post("/:projectId/members", authenticateUser, projectController.addMember);

/**
 * @swagger
 * /projects/{projectId}/members:
 *   get:
 *     summary: Get all members of a project
 *     tags: [Projects]
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
 *         description: List of project members
 */
router.get("/:projectId/members", authenticateUser, projectController.getProjectMembers);


module.exports = router;
