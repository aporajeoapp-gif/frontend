import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://aporajeo-web-backend.onrender.com/api/v1", 
});

// get data from localstorage
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
