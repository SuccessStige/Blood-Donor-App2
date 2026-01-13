// src/utils/api.jsx
import axios from "axios";

// Local dev
// const API_BASE = "http://127.0.0.1:8000/api/";

// Production

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const API = axios.create({
//   baseURL: "http://54.173.188.175:8000/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const API_BASE = "http://127.0.0.1:8000/api/";

const API = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
