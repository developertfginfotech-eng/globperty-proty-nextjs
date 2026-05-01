import apiClient from "./apiClient";

export async function addReview(reviewData) {
  const res = await apiClient.post("/reviews", reviewData);
  return res.data;
}

export async function getPropertyReviews(propertyId) {
  const res = await apiClient.get(`/reviews/property/${propertyId}`);
  return res.data.reviews || [];
}

export async function getUserReviews() {
  const res = await apiClient.get("/reviews/user");
  return res.data.reviews || [];
}

export async function getReviewsOnMyProperties() {
  const res = await apiClient.get("/reviews/my-properties");
  return res.data.reviews || [];
}

export async function updateReview(reviewId, reviewData) {
  const res = await apiClient.put(`/reviews/${reviewId}`, reviewData);
  return res.data;
}

export async function deleteReview(reviewId) {
  const res = await apiClient.delete(`/reviews/${reviewId}`);
  return res.data;
}
