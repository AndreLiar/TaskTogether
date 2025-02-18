//src/services/projectService.js
const projectRepository = require("../repositories/projectRepository");

const createProject = async (userId, name, description) => {
    const project = await projectRepository.createProject({
      name,
      description,
      ownerId: userId,
    });
    // Add the owner as an admin member.
    await projectRepository.addProjectMember(project.id, userId, "admin");
    return project;
  };
  
  const getProjects = async (userId) => {
    const ownedProjects = await projectRepository.getProjectsByUser(userId);
    const memberProjects = await projectRepository.getProjectsByMembership(userId);
    // Combine and remove duplicates if needed.
    const projectsMap = new Map();
    [...ownedProjects, ...memberProjects].forEach((proj) => {
      projectsMap.set(proj.id, proj);
    });
    return Array.from(projectsMap.values());
  };


const getProject = async (userId, projectId) => {
    return await projectRepository.getProjectById(projectId, userId);
};

const updateProject = async (userId, projectId, name, description) => {
    return await projectRepository.updateProject(projectId, userId, { name, description });
};

const deleteProject = async (userId, projectId) => {
    return await projectRepository.deleteProject(projectId, userId);
};

const addMember = async (projectId, userId, role) => {
    return await projectRepository.addProjectMember(projectId, userId, role);
  };
  
  const getProjectMembers = async (projectId) => {
    return await projectRepository.getProjectMembers(projectId);
  };
  
  

  
module.exports = { createProject, getProjects, getProject, updateProject, deleteProject ,
    addMember,
  getProjectMembers,
};
