//src/controllers/projectController.js
const projectService = require("../services/projectService");

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;
        const project = await projectService.createProject(userId, name, description);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await projectService.getProjects(userId);
        res.json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;
        const project = await projectService.getProject(userId, projectId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;
        const { name, description } = req.body;

        const updated = await projectService.updateProject(userId, projectId, name, description);
        if (updated.count === 0) {
            return res.status(404).json({ error: "Project not found or unauthorized" });
        }

        res.json({ message: "Project updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;

        const deleted = await projectService.deleteProject(userId, projectId);
        if (deleted.count === 0) {
            return res.status(404).json({ error: "Project not found or unauthorized" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addMember = async (req, res) => {
    try {
      const { projectId } = req.params;
      const { userId, role } = req.body;
      const member = await projectService.addMember(projectId, userId, role);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get all members of a project
  const getProjectMembers = async (req, res) => {
    try {
      const { projectId } = req.params;
      const members = await projectService.getProjectMembers(projectId);
      res.json(members);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = { createProject, getProjects, getProject, updateProject, deleteProject, addMember, getProjectMembers, };
