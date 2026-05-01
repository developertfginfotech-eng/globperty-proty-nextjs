import apiClient from "./apiClient";

export async function getKYCStatus() {
  const res = await apiClient.get("/kyc/status");
  return res.data;
}

export async function getAllKYCSubmissions(status = "all") {
  const url = status === "all" ? "/kyc/all" : `/kyc/all?status=${status}`;
  const res = await apiClient.get(url);
  return res.data;
}

export async function verifyKYC(kycId, status, rejectionReason = "") {
  const res = await apiClient.put(`/kyc/verify/${kycId}`, { status, rejectionReason });
  return res.data;
}

export async function getKYCDetails(kycId) {
  const res = await apiClient.get(`/kyc/details/${kycId}`);
  return res.data;
}
