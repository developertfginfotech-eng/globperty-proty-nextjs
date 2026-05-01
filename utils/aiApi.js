import apiClient from "./apiClient";

export async function generateDescription(propertyData) {
  const res = await apiClient.post("/ai/generate-description", propertyData);
  return res.data;
}

export async function autoUpdateDescription(propertyId) {
  const res = await apiClient.post(`/ai/auto-update-description/${propertyId}`);
  return res.data;
}

export async function getRecommendations(preferences = {}) {
  const res = await apiClient.get("/ai/recommendations", { params: preferences });
  return res.data;
}

export async function matchAgents(buyerProfile) {
  const res = await apiClient.post("/ai/match-agents", buyerProfile);
  return res.data;
}

export async function generateAutoResponse(inquiryData) {
  const res = await apiClient.post("/ai/auto-response", inquiryData);
  return res.data;
}

export async function getPropertyValuation(propertyId) {
  const res = await apiClient.post("/ai/property-valuation", { propertyId });
  return res.data;
}

export async function getInvestmentScore(propertyId) {
  const res = await apiClient.post("/ai/investment-score", { propertyId });
  return res.data;
}

export async function analyzeImages(images) {
  const res = await apiClient.post("/ai/analyze-images", { images });
  return res.data;
}

export async function getBuyerIntent(params = {}) {
  const res = await apiClient.get("/ai/buyer-intent", { params });
  return res.data;
}

export async function analyzeBuyerIntentForAgent(propertyIds) {
  const res = await apiClient.post("/ai/buyer-intent-analysis", { propertyIds });
  return res.data;
}

export async function enhanceImage(imageBase64, enhancement = "enhance") {
  const res = await apiClient.post("/ai/enhance-image", { image: imageBase64, enhancement });
  return res.data;
}

export async function enhanceImageMulti(imageBase64, types = ["enhance", "improve", "sky", "declutter"]) {
  const res = await apiClient.post("/ai/enhance-image-multi", { image: imageBase64, types });
  return res.data;
}

export async function getCrossCountryMatches(propertyId, limitPerCountry = 3) {
  const res = await apiClient.get(`/ai/cross-country-match/${propertyId}`, {
    params: { limitPerCountry },
  });
  return res.data;
}

export async function transcribeVoice(audioBase64, mimeType = "audio/webm") {
  const res = await apiClient.post("/ai/transcribe-voice", { audioBase64, mimeType });
  return res.data;
}

export async function getNegotiationStrategy({ propertyId, buyerBudget, initialOffer, role = "buyer" }) {
  const res = await apiClient.post("/ai/negotiation-strategy", {
    propertyId,
    buyerBudget,
    initialOffer,
    role,
  });
  return res.data;
}

export async function detectFraud({ images = [], propertyName, propertyType, city, price, agentId }) {
  const res = await apiClient.post("/ai/detect-fraud", {
    images,
    propertyName,
    propertyType,
    city,
    price,
    agentId,
  });
  return res.data;
}

export async function batchGenerateDescriptions(propertyIds) {
  const res = await apiClient.post("/ai/batch-generate-descriptions", { propertyIds });
  return res.data;
}
