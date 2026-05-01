import apiClient from "./apiClient";

export async function submitTourRequest(tourData) {
  const res = await apiClient.post("/tours/request", tourData);
  return res.data;
}

export async function getMyTours() {
  const res = await apiClient.get("/tours/my-tours");
  return res.data.tours || [];
}

export async function getToursByProperty(propertyId) {
  const res = await apiClient.get(`/tours/property/${propertyId}`);
  return res.data.tours || [];
}

export async function updateTourStatus(tourId, status) {
  const res = await apiClient.put(`/tours/${tourId}/status`, { status });
  return res.data;
}
