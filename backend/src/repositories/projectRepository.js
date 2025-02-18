//src/repositories/projectRepository.js

const prisma = require("../config/prisma");


// Create a project
const createProject = async (projectData) => {
    console.log("🔹 Creating Project with data:", projectData);
    try {
        const project = await prisma.project.create({ data: projectData });
        console.log("✅ Project Created:", project);
        return project;
    } catch (err) {
        console.error("❌ Error in createProject:", err.message);
        throw err;
    }
};

// Get all projects for a user
const getProjectsByUser = async (userId) => {
    return await prisma.project.findMany({ where: { ownerId: userId } });
};

// Get a single project by ID
const getProjectById = async (projectId, userId) => {
    return await prisma.project.findFirst({
        where: { id: projectId, ownerId: userId },
    });
};

// Update a project
const updateProject = async (projectId, userId, data) => {
    return await prisma.project.updateMany({
        where: { id: projectId, ownerId: userId },
        data,
    });
};

// Delete a project
const deleteProject = async (projectId, userId) => {
    return await prisma.project.deleteMany({
        where: { id: projectId, ownerId: userId },
    });
};

const addProjectMember = async (projectId, userId, role = "member") => {
    return await prisma.projectMember.create({
      data: {
        projectId,
        userId,
        role,
      },
    });
  };
  
  
  const getProjectMembers = async (projectId) => {
    return await prisma.projectMember.findMany({
      where: { projectId },
      include: { user: true }, // to fetch user details along with the membership info
    });
  };

  const getProjectsByMembership = async (userId) => {
    return await prisma.project.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
    });
  };
  

module.exports = { createProject, getProjectsByUser, getProjectById, updateProject, deleteProject, addProjectMember,
    getProjectMembers,getProjectsByMembership, };
