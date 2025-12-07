import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Crumb = {
  label: string;
  url: string;
};

export type CrumbStore = {
  crumb: Crumb | null;
  add: (label: string, url: string) => void;
  removeAll: () => void;
};

export const useCrumbStore = create<CrumbStore>()(
  persist(
    (set) => ({
      crumb: null, // Initial state is null
      add: (label: string, url: string) => {
        set({ crumb: { label, url } });
      },
      removeAll: () => {
        set({ crumb: null });
      },
    }),
    {
      name: "crumb-storage",
    }
  )
);
