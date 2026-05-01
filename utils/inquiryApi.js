import apiClient from "./apiClient";

export async function getInquiries() {
  const res = await apiClient.get("/inquiries");
  return res.data;
}

export async function getInquiry(id) {
  const res = await apiClient.get(`/inquiries/${id}`);
  return res.data;
}

export async function replyInquiry(id, content) {
  const res = await apiClient.post(`/inquiries/${id}/reply`, { content });
  return res.data;
}

export async function deleteInquiry(id) {
  const res = await apiClient.delete(`/inquiries/${id}`);
  return res.data;
}

export async function getUnreadCount() {
  const res = await apiClient.get("/inquiries/unread-count");
  return res.data.count || 0;
}
