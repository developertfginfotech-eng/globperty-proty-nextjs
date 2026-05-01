import apiClient from "./apiClient";

export async function getMarketOverview(filters = {}) {
  const res = await apiClient.get("/market-intelligence/overview", { params: filters });
  return res.data;
}

export async function getPriceTrends(filters = {}) {
  const res = await apiClient.get("/market-intelligence/price-trends", { params: filters });
  return res.data;
}

export async function getHotAreas(filters = {}) {
  const res = await apiClient.get("/market-intelligence/hot-areas", { params: filters });
  return res.data;
}

export async function compareCities(cities) {
  const res = await apiClient.get("/market-intelligence/compare-cities", {
    params: { cities: cities.join(",") },
  });
  return res.data;
}

export async function getInvestmentHotspots(filters = {}) {
  const res = await apiClient.get("/market-intelligence/investment-hotspots", { params: filters });
  return res.data;
}

export async function getMarketForecast(filters = {}) {
  const res = await apiClient.get("/market-intelligence/forecast", { params: filters });
  return res.data;
}
