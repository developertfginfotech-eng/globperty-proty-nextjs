import apiClient from "./apiClient";

export async function sendMessage(message, sessionId, conversationHistory = []) {
  const res = await apiClient.post("/chat/query", {
    message,
    sessionId,
    conversationHistory,
  });
  return res.data;
}

export async function compareProperties(propertyIds) {
  const res = await apiClient.post("/chat/compare", { propertyIds });
  return res.data;
}
