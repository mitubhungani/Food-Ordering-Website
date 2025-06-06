import axios from "axios";
import { Food, Review } from "../Types";

const api = axios.create({
  baseURL: "http://localhost:3000/food",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchFoodsAPI = async (): Promise<Food[]> => {
  const response = await api.get("/");
  const data = response.data;
  return data;
};

export const addFoodAPI = async (food: Food): Promise<Food> => {
  const response = await api.post("/", food);
  const data = response.data;
  return data;
};

export const updateFoodAPI = async (
  id: string,
  updateData: Review
): Promise<Food> => {
  const response = await api.patch(`/${id}`, updateData);
  const data = response.data;
  return data;
};

export const getFoodByIdAPI = async (id: string): Promise<Food> => {
  const response = await api.get(`/${id}`);
  const data = response.data;
  return data;
};

export const deleteFoodAPI = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};
