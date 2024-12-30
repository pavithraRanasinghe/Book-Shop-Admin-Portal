import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7067/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or your preferred storage solution)
    const token = localStorage.getItem("authToken");

    // If token exists, set it in the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optionally add a response interceptor to handle token expiration or errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      console.error("Unauthorized. Redirecting to login...");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
