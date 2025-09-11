import { User } from "@/lib/dbInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState{
  user: User | null;
  reloadKey:number;
  setUser: (user: User) => void;
  clearUser: () => void;
  reload: () => void;
}

export const useUserInfoStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      reloadKey:0,
      setUser: (user) => {set({ user });},
      clearUser: () => set({ user: null }),
      reload: () => {
        set((state)=>({reloadKey:state.reloadKey+1}))
      }
    }),
    {
      name: 'userInfo-storage', // localStorage key
    }
  )
)
