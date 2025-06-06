import { Review } from "@/Types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/review",
  headers: {
    "Content-Type": "application/json",
  },
});

export const addReview = async (review: Review): Promise<Review[]> => {
  const res = await api.post(`/`, review);
  return res.data;
};

export const getReviewsByQueryAPI = async (query: string) => {
  const res = await api.get(`/?${query}`);
  return res.data;
};

export const updateReview = async (
  reviewId: string,
  updateData: Review
): Promise<Review | undefined> => {
  const res = await api.put(`/${reviewId}`, updateData);
  return res.data;
};

export const deleteReview = async (reviewId: string): Promise<void> => {
  await api.delete(`/${reviewId}`);
};
