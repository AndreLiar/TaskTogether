// src/services/projectService.ts
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001/api";

/**
 * Creates a new project.
 */
export const createProject = async (
  name: string,
  description: string
): Promise<Object | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Project creation failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
};

/**
 * Fetches all projects for the authenticated user.
 */
export const getProjects = async (): Promise<Array<Object> | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch projects");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};

/**
 * Fetches a single project by ID.
 */
export const getProject = async (
  projectId: string
): Promise<Object | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch project");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

/**
 * Updates an existing project.
 */
export const updateProject = async (
  projectId: string,
  name: string,
  description: string
): Promise<Object | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Project update failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating project:", error);
    return null;
  }
};

/**
 * Deletes a project by ID.
 */
export const deleteProject = async (
  projectId: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
};

/**
 * Adds a new member to a project.
 */
export const addProjectMember = async (
  projectId: string,
  userId: string,
  role: string
): Promise<Object | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, role }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add member");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding project member:", error);
    return null;
  }
};

/**
 * Fetches all members for a given project.
 */
export const getProjectMembers = async (
  projectId: string
): Promise<Array<Object> | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/members`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch project members");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching project members:", error);
    return null;
  }
};
