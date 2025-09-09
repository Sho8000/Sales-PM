import { Prospects } from "@/lib/dbInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProspectsState{
  prospect: Prospects | null;
  reloadKey: number;
  setProspect: (prospect: Prospects) => void;
  clearProspect: () => void;
  reload: () => void;
}

export const useClickedProspectInfoStore = create<ProspectsState>()(
  persist(
    (set) => ({
      prospect: null,
      reloadKey: 0,

      setProspect: (prospect) => {
        set({ prospect });
      },
      clearProspect: () => set({ prospect: null }),
      reload: () => {
        set((state)=>({reloadKey:state.reloadKey+1}))
      }
    }),
    {
      name: 'clickedProspectInfo-storage', // localStorage key
    }
  )
)
