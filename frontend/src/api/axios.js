import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api", // http://localhost:8000/api
    withCredentials: true, // optional (cookies)
    headers: {
        "Content-Type": "application/json",
    }
});

// Attach token automatically if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;