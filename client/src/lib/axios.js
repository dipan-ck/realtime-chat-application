const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"; // Add trailing slash

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});