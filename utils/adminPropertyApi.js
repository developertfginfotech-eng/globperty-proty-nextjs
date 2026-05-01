import apiClient from "./apiClient";

export async function getPendingProperties() {
  const res = await apiClient.get("/property/admin/pending");
  return res.data.properties || [];
}

export async function getPropertiesForApproval(status = "all") {
  const res = await apiClient.get(`/property/admin/approval?status=${status}`);
  return res.data.properties || [];
}

export async function approveProperty(propertyId) {
  const res = await apiClient.put(`/property/admin/approve/${propertyId}`, {});
  return res.data;
}

export async function rejectProperty(propertyId, reason) {
  const res = await apiClient.put(`/property/admin/reject/${propertyId}`, { reason });
  return res.data;
}

export async function softDeleteProperty(propertyId) {
  const res = await apiClient.put(`/property/admin/soft-delete/${propertyId}`, {});
  return res.data;
}

export async function permanentDeleteProperty(propertyId) {
  const res = await apiClient.delete(`/property/admin/permanent-delete/${propertyId}`);
  return res.data;
}
