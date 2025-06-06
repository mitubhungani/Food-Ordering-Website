import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Cart } from "../Types";
import {
  addToCartAPI,
  fetchCartListAPI,
  removeFromCartAPI,
  updateCartDataAPI,
} from "../api/cartApi";

interface CartList {
  cartList: Cart[];
  userCartItems?: Cart[]; 
  addToCart: (food: Cart, userId: string) => void;
  removeFromCart: (id: string) => void;
  updateCart: (id: string, updateData: Cart) => void;
  initializeCart: (userId: string) => void;
  checkoutCart: (userId: string) => void; 
}

export const useCartList = create<CartList>()(
  devtools(
    persist(
      (set, get) => ({
        cartList: [],

        addToCart: async (food, userId) => {
          const existingItem = get().cartList.find(
            (item) => item.food.id === food.food.id && item.userId === userId
          );

          if (existingItem) {
            alert("This food item is already in your cart.");
            return;
          }

          await addToCartAPI(food);

          set((state) => ({
            cartList: [...state.cartList, food],
          }));
        },

        updateCart: async (id, updateData) => {
          await updateCartDataAPI(id, updateData);
          set((state) => ({
            cartList: state.cartList.map((item) =>
              item.id === id ? updateData : item
            ),
          }));
        },

        removeFromCart: async (id) => {
          await removeFromCartAPI(id);
          set((state) => ({
            cartList: state.cartList.filter((item) => item.id !== id),
          }));
        },

        initializeCart: async (userId) => {
          if (!userId) return; 

          try {
            const cartList = await fetchCartListAPI();

            const userCartItems = (cartList ?? []).filter(
              (item) => item.userId === userId || item.userId === userId
            );

            set({ cartList: userCartItems, userCartItems });
          } catch (error) {
            console.error("Error fetching cart data:", error);
          }
        },

        checkoutCart: async (userId) => {
          try {
            const { cartList } = get();

            const userCartItems = cartList.filter(
              (item) => item.userId === userId || item.userId === userId
            );

            if (userCartItems.length === 0) {
              alert("Your cart is already empty.");
              return;
            }

            for (const item of userCartItems) {
              if (item.id) {
                await removeFromCartAPI(item.id);
              } else {
                console.error("Item ID is undefined, skipping removal.");
              }
            }

            set((state) => ({
              cartList: state.cartList.filter(
                (item) => item.userId !== userId && item.userId !== userId
              ),
              userCartItems: [],
            }));

            alert("Checkout successful! Your cart has been cleared.");
          } catch (error) {
            console.error("Error during checkout:", error);
          }
        },
      }),
      { name: "cartStore" }
    )
  )
);
