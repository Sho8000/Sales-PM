import { User } from "@/lib/dbInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState{
  user: User | null;
  setUser: (user: User) => void;
//  clearUser: () => void;
}

export const useUserInfoStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => {
        const prevUser = get().user;
        if (prevUser && prevUser !== user) {
          set({ user });
        }
        set({ user });
      },

/* 
      removeItem: (recipeId) => {
        const newCart = get().cart.filter(
          (item) => item.menu.recipeId !== recipeId
        )
        const totalPrice = newCart.reduce((sum, item) => sum + item.price, 0)
        const totalItems = newCart.reduce((sum,item) => sum + item.amount, 0)
        set({ cart: newCart, totalPrice,totalItems })
      },
 */
    }),
    {
      name: 'userInfo-storage', // localStorage key
    }
  )
)
