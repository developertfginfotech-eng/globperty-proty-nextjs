import apiClient from "./apiClient";

export async function getDashboardStats() {
  try {
    const res = await apiClient.get("/dashboard/stats");
    return res.data;
  } catch {
    return { success: false, activities: [], stats: {} };
  }
}
