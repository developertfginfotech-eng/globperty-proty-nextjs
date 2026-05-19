import apiClient from "./apiClient";

export async function getSavedSearches() {
  const res = await apiClient.get("/saved-searches");
  return res.data.savedSearches || res.data || [];
}

export async function deleteSavedSearch(id) {
  const res = await apiClient.delete(`/saved-searches/${id}`);
  return res.data;
}
