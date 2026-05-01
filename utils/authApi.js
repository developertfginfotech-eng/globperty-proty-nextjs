import apiClient from "./apiClient";

export async function login(email, password) {
  const response = await apiClient.post("/auth/login", { email, password });
  const { token, user } = response.data;
  if (token && typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
  return response.data;
}

export async function register({ name, email, password, phone, country, countryCode, role }) {
  const response = await apiClient.post("/auth/register", {
    name,
    email,
    password,
    phone,
    country,
    countryCode,
    role,
  });
  const { token, user } = response.data;
  if (token && typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
  return response.data;
}

export async function logout() {
  try {
    await apiClient.post("/auth/logout");
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
  }
}

export async function getProfile() {
  const response = await apiClient.get("/auth/profile");
  return response.data.user || response.data;
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("authToken");
}
