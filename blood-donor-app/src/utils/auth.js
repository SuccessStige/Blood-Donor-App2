// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export const login = (token) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => !!localStorage.getItem("token");

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // ✅ use named export
    return decoded.is_superuser ? "admin" : "user"; 
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
};
