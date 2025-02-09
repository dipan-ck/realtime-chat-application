import axios from "axios";

// ✅ Ensure NO trailing slash at the end
// axios.js
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" // No trailing slash
  : "";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});