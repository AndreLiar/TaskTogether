const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

/**
 * Creates a new task.
 * @param {Object} task - The task object containing title, description, and projectId.
 * @returns {Promise<Object|null>} - The created task or null on error.
 */
export const createTask = async (task: { title: string; description: string; projectId: string }): Promise<Object | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Task creation failed");
    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

/**
 * Fetches all tasks for a specific project.
 * @param {string} projectId - The ID of the project.
 * @returns {Promise<Array<Object>|null>} - An array of tasks or null on error.
 */
export const getTasks = async (projectId: string): Promise<Array<Object> | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};

/**
 * Fetches a single task by its ID within a project.
 * @param {string} projectId - The ID of the project.
 * @param {string} taskId - The ID of the task.
 * @returns {Promise<Object|null>} - The task details or null on error.
 */
export const getTask = async (projectId: string, taskId: string): Promise<Object | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks/${projectId}/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch task");
    return await response.json();
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
};

/**
 * Assigns a task to a user.
 * @param {string} taskId - The ID of the task.
 * @param {string} userId - The ID of the user to assign the task to.
 * @returns {Promise<Object|null>} - The updated task or null on error.
 */
export const assignTask = async (taskId: string, userId: string): Promise<Object | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/assign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) throw new Error("Task assignment failed");
    return await response.json();
  } catch (error) {
    console.error("Error assigning task:", error);
    return null;
  }
};

/**
 * Updates the status of a task.
 * @param {string} taskId - The ID of the task.
 * @param {string} status - The new status of the task.
 * @returns {Promise<Object|null>} - The updated task or null on error.
 */
export const updateTaskStatus = async (taskId: string, status: string): Promise<Object | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Task status update failed");
    return await response.json();
  } catch (error) {
    console.error("Error updating task status:", error);
    return null;
  }
};

/**
 * Deletes a task by its ID.
 * @param {string} taskId - The ID of the task.
 * @returns {Promise<boolean>} - True if deletion is successful, false otherwise.
 */
export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok; // Return true if deletion is successful
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};