import { Review } from "@/Types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ReviewList {
  reviews: Review[];
  addReviews: (review: Review) => void;
  deleteReview: (reviewId: string) => void;
  updateReview: (reviewId: string, review: Review) => void;
  initializeReviews: (reviews: Review[]) => void;
}

export const useReviewList = create<ReviewList>()(
  devtools(
    persist(
      (set) => ({
        reviews: [],
        addReviews: async (review) => {
          set((state) => ({ reviews: [...state.reviews, review] }));
        },

        deleteReview: async (reviewId) => {
          set((state) => ({
            reviews: state.reviews.filter((r) => r.id !== reviewId),
          }));
        },

        updateReview: async (reviewId: string, review) => {
          set((state) => ({
            reviews: state.reviews.map((r) => (r.id === reviewId ? review : r)),
          }));
        },

        initializeReviews: (reviews: Review[]) => set({ reviews }),
      }),
      { name: "reviewstore" }
    )
  )
);
