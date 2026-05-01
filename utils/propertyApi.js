import apiClient from "./apiClient";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:4000";

// Map backend property shape to the format theme components expect
export function mapProperty(p) {
  const firstImage = p.images?.[0] || p.photos?.[0] || "";
  const imageSrc = firstImage.startsWith("http")
    ? firstImage
    : `${BACKEND_URL}${firstImage}`;

  return {
    id: p._id,
    imageSrc,
    images: (p.images || p.photos || []).map((img) =>
      img.startsWith("http") ? img : `${BACKEND_URL}${img}`
    ),
    title: p.propertyName,
    location: [p.city, p.countryState, p.country].filter(Boolean).join(", "),
    beds: p.bedrooms ?? 0,
    baths: p.bathrooms ?? 0,
    sqft: p.superBuiltUpArea ? p.superBuiltUpArea.toLocaleString() : "N/A",
    price: p.price ?? 0,
    long: p.longitude ?? 0,
    lat: p.latitude ?? 0,
    categories: [p.propertyType, p.propertyCategory].filter(Boolean),
    cities: [p.city, p.country].filter(Boolean),
    adType: p.propertyAdType === "rent" ? "For Rent" : "For Sale",
    status: p.approvalStatus,
    agentId: p.agentId,
    description: p.description || "",
    country: p.country,
    city: p.city,
    propertyType: p.propertyType,
    propertyCategory: p.propertyCategory,
    propertyAdType: p.propertyAdType,
  };
}

export async function getAllProperties(params = {}) {
  const response = await apiClient.get("/property/all", { params });
  const raw = response.data.properties || [];
  return raw.map(mapProperty);
}

export async function getPropertyById(id) {
  const response = await apiClient.get(`/property/${id}`);
  return mapProperty(response.data.property || response.data);
}

export async function getPropertyTypes() {
  const response = await apiClient.get("/property/types");
  return response.data;
}

export async function getCategoryCounts() {
  const response = await apiClient.get("/property/categories/counts");
  return response.data.categories || [];
}

export async function getCityCounts() {
  const response = await apiClient.get("/property/cities/counts");
  return response.data.cities || [];
}

export async function addProperty(propertyData) {
  const isFormData = propertyData instanceof FormData;
  const headers = isFormData ? {} : { "Content-Type": "application/json" };
  const response = await apiClient.post("/property/add", propertyData, {
    headers,
  });
  return response.data;
}

export async function getAgentProperties() {
  const response = await apiClient.get("/property/agent/properties");
  const raw = response.data.properties || [];
  return raw.map(mapProperty);
}

export async function updateProperty(id, data) {
  const response = await apiClient.put(`/property/${id}`, data);
  return response.data;
}

export async function deleteProperty(id) {
  const response = await apiClient.delete(`/property/${id}`);
  return response.data;
}
