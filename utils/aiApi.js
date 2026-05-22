import apiClient from "./apiClient";

// --- AI Copilot (Chat) ---

export const chatAPI = {
  sendMessage: async (message, sessionId, conversationHistory = []) => {
    const res = await apiClient.post("/chat/query", { message, sessionId, conversationHistory });
    return res.data;
  },

  compareProperties: async (propertyIds) => {
    const res = await apiClient.post("/chat/compare", { propertyIds });
    return res.data;
  },
};

// --- AI Features ---

export const aiAPI = {
  // Generate property description from metadata
  generateDescription: async (propertyData) => {
    const res = await apiClient.post("/ai/generate-description", propertyData);
    return res.data;
  },

  // Auto-update description for an existing listing (agent/admin)
  autoUpdateDescription: async (propertyId) => {
    const res = await apiClient.post(`/ai/auto-update-description/${propertyId}`);
    return res.data;
  },

  // Analyze property images and extract details (base64 array)
  analyzeImages: async (images) => {
    const res = await apiClient.post("/ai/analyze-images", { images });
    return res.data;
  },

  // Personalized property recommendations
  getRecommendations: async (params = {}) => {
    const res = await apiClient.get("/ai/recommendations", { params });
    return res.data;
  },

  // Match a buyer to best agents
  matchAgents: async ({ location, propertyType, budget, urgency, message, language } = {}) => {
    const res = await apiClient.post("/ai/match-agents", { location, propertyType, budget, urgency, message, language });
    return res.data;
  },

  // AI property valuation by propertyId
  getPropertyValuation: async (propertyId) => {
    const res = await apiClient.post("/ai/property-valuation", { propertyId });
    return res.data;
  },

  // AI investment score by propertyId
  getInvestmentScore: async (propertyId) => {
    const res = await apiClient.post("/ai/investment-score", { propertyId });
    return res.data;
  },

  // AI negotiation strategy
  getNegotiationStrategy: async ({ propertyId, buyerBudget, initialOffer, role = "buyer" } = {}) => {
    const res = await apiClient.post("/ai/negotiation-strategy", { propertyId, buyerBudget, initialOffer, role });
    return res.data;
  },

  // Buyer intent score (pass userId or sessionId)
  getBuyerIntent: async ({ userId, sessionId } = {}) => {
    const res = await apiClient.get("/ai/buyer-intent", { params: { userId, sessionId } });
    return res.data;
  },

  // Buyer intent analysis across agent's listings (agent/admin)
  analyzeBuyerIntent: async (properties) => {
    const res = await apiClient.post("/ai/buyer-intent-analysis", { properties });
    return res.data;
  },

  // AI lead auto-response — creates Lead record automatically
  generateLeadResponse: async ({ propertyId, userName, userEmail, userMessage, inquiryType = "general" } = {}) => {
    const res = await apiClient.post("/ai/auto-response", { propertyId, userName, userEmail, userMessage, inquiryType });
    return res.data;
  },

  // Cross-country property matches
  getCrossCountryMatches: async (propertyId, limit = 3) => {
    const res = await apiClient.get(`/ai/cross-country-match/${propertyId}`, { params: { limit } });
    return res.data;
  },

  // Transcribe voice audio to text
  transcribeVoice: async (audioBase64, mimeType = "audio/webm") => {
    const res = await apiClient.post("/ai/transcribe-voice", { audioBase64, mimeType });
    return res.data;
  },

  // Enhance a single property image
  enhanceImage: async (image, enhancement = "enhance") => {
    const res = await apiClient.post("/ai/enhance-image", { image, enhancement });
    return res.data;
  },

  // Generate multiple enhancement previews for one image
  enhanceImageMulti: async (image, types = ["enhance", "sky", "declutter", "upscale"]) => {
    const res = await apiClient.post("/ai/enhance-image-multi", { image, types });
    return res.data;
  },

  // Fraud detection (admin/agent)
  detectFraud: async ({ images = [], propertyName, propertyType, city, price, agentId } = {}) => {
    const res = await apiClient.post("/ai/detect-fraud", { images, propertyName, propertyType, city, price, agentId });
    return res.data;
  },

  // Batch generate descriptions (admin)
  batchGenerateDescriptions: async (propertyIds) => {
    const res = await apiClient.post("/ai/batch-generate-descriptions", { propertyIds });
    return res.data;
  },
};
