const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

console.log("Backend URL:", API_BASE_URL);

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg: string;
      try {
        const parsed = JSON.parse(errorText);
        errorMsg = parsed.error || "Registration failed.";
      } catch (e) {
        errorMsg = errorText;
      }
      return { error: errorMsg };
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Registration failed. Try again." };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    const result = await response.json();
    // Store the token in localStorage
    localStorage.setItem("token", result.token);
    // Save the user details (email and name) in localStorage
    // (Assumes that the backend includes the user's name in the result)
    localStorage.setItem("user", JSON.stringify({ email, name: result.name }));
    return result;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    return await response.json();
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
};

// --- New Logout Function ---
export const logoutUser = () => {
  localStorage.removeItem("token");
  // You may clear any other user data here if needed.
};
