import { Prospects } from "@/lib/dbInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProspectsState{
  prospect: Prospects | null;
  setProspect: (prospect: Prospects) => void;
  clearProspect: () => void;
}

export const useClickedProspectInfoStore = create<ProspectsState>()(
  persist(
    (set) => ({
      prospect: null,

      setProspect: (prospect) => {
        set({ prospect });
      },
      clearProspect: () => set({ prospect: null })
    }),
    {
      name: 'clickedProspectInfo-storage', // localStorage key
    }
  )
)
