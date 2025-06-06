import axios from "axios";
import { User } from "../Types";

const api = axios.create({
  baseURL: "http://localhost:3000/user",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUserApi = async (): Promise<User[]> => {
  const response = await api.get("/");
  const data = response.data;
  return data;
};

export const addUserApi = async (user: User): Promise<User> => {
  const response = await api.post("/", user);
  const data = response.data;
  return data;
};

export const deleteUserApi = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/${id}`);
  const data = response.data;
  return data;
};

export const loginUserApi = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const { data } = await api.get<User[]>("/");
    const user = data.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      alert("User not found");
      return null;
    }
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};
