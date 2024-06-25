import axios from "axios";

const BASE_URL = "http://172.235.21.99:9591/"; // Replace with your API base URL


const api = axios.create({
  baseURL: BASE_URL,
});


// Add an interceptor to dynamically set the Authorization header before each request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // If the accessToken exists, set the Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;