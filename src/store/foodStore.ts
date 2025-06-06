import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  addFoodAPI,
  deleteFoodAPI,
  fetchFoodsAPI,
  updateFoodAPI,
} from "../api/foodApi";
import { Food, Review } from "../Types";

interface FoodStore {
  foods: Food[];
  addFood: (food: Food) => Promise<void>;
  updateFood: (id: string, food: Review) => Promise<void>;
  deleteFood: (id: string) => Promise<void>;
  initializeFoods: () => Promise<void>;
}

export const useFoodStore = create<FoodStore>()(
  devtools(
    persist(
      (set) => ({
        foods: [],

        initializeFoods: async () => {
          try {
            const foodsFromAPI = await fetchFoodsAPI();
            set({ foods: foodsFromAPI });
          } catch (error) {
            console.error("Failed to fetch foods:", error);
          }
        },

        addFood: async (food) => {
          try {
            const newFood = await addFoodAPI(food);
            set((state) => ({
              foods: [...state.foods, newFood],
            }));
          } catch (error) {
            console.error("Failed to add food:", error);
          }
        },

        updateFood: async (id, food) => {
          try {
            const updatedFood = await updateFoodAPI(id, food); // ✅ Corrected
            set((state) => ({
              foods: state.foods.map((f) =>
                f.id.toString() === id ? updatedFood : f
              ),
            }));
          } catch (error) {
            console.error("Failed to update food:", error);
          }
        },

        deleteFood: async (id) => {
          try {
            await deleteFoodAPI(id);
            set((state) => ({
              foods: state.foods.filter((f) => f.id.toString() !== id),
            }));
          } catch (error) {
            console.error("Failed to delete food:", error);
          }
        },
      }),
      { name: "foodStore" }
    )
  )
);
