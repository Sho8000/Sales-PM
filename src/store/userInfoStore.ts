import { User } from "@/lib/dbInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState{
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserInfoStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {set({ user });},
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'userInfo-storage', // localStorage key
    }
  )
)
