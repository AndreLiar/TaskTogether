const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

export const startVideoCall = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/video/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ projectId }),
    });
    if (!response.ok) throw new Error("Failed to start video call");
    return await response.json();
  } catch (error) {
    console.error("Error starting video call:", error);
    return null;
  }
};

export const getVideoCallHistory = async (projectId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/video/${projectId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch video call history");
    return await response.json();
  } catch (error) {
    console.error("Error fetching video call history:", error);
    return [];
  }
};
