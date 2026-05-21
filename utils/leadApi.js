import apiClient from "./apiClient";

export async function getLeads() {
  const res = await apiClient.get("/leads");
  return res.data;
}

export async function getLead(id) {
  const res = await apiClient.get(`/leads/${id}`);
  return res.data;
}

export async function replyLead(id, content) {
  const res = await apiClient.post(`/leads/${id}/reply`, { content });
  return res.data;
}

export async function deleteLead(id) {
  const res = await apiClient.delete(`/leads/${id}`);
  return res.data;
}

export async function getUnreadCount() {
  const res = await apiClient.get("/leads/unread-count");
  return res.data.count || 0;
}
