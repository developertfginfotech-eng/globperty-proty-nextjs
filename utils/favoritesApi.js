import apiClient from "./apiClient";

export async function getFavorites() {
  const res = await apiClient.get("/favorites");
  return res.data.favorites || [];
}

export async function addFavorite(propertyId) {
  const res = await apiClient.post("/favorites", { propertyId });
  return res.data;
}

export async function removeFavorite(propertyId) {
  const res = await apiClient.delete(`/favorites/${propertyId}`);
  return res.data;
}

export async function checkFavorite(propertyId) {
  const res = await apiClient.get(`/favorites/check/${propertyId}`);
  return res.data.isFavorite || false;
}

export async function getFavoritesOnMyProperties() {
  const res = await apiClient.get("/favorites/my-properties");
  return res.data.favorites || [];
}
