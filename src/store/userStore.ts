import { create } from "zustand";
import { loginUserApi, addUserApi, deleteUserApi } from "../api/userApi";
import { User } from "../Types";
import { devtools, persist } from "zustand/middleware";
import { useCartList } from "./cartStore";

interface UserStore {
  users: User[];
  loggedInUser: User | null;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        loggedInUser: null,

        addUser: async (user) => {
          await addUserApi(user);
          set((state) => ({
            users: [...state.users, user],
          }));
        },

        removeUser: async (id) => {
          await deleteUserApi(id);
          set((state) => ({
            users: state.users.filter((u) => u.id !== id),
          }));
        },

        loginUser: async (email, password) => {
          const user = await loginUserApi(email, password);
          if (user) {
            set({ loggedInUser: user });
            return true;
          }
          return false;
        },

        logoutUser: () => {
          localStorage.removeItem("user");
          localStorage.removeItem("cartStore");
          useCartList.setState({ cartList: [] });
          set({ loggedInUser: null });
        },
      }),
      { name: "users" }
    )
  )
);
