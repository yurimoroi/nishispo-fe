import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UrlStore = {
  urls: string[];
  addUrl: (url: string) => void;
  removeAllUrls: () => void;
};

export const useUrlStore = create<UrlStore>()(
  persist(
    (set, get) => ({
      urls: [],
      addUrl: (url: string) => {
        const state = get();
        // Check if the URL is already in the list
        if (!state.urls.includes(url)) {
          const newUrls = [...state.urls, url];

          // Keep only the last two URLs
          if (newUrls.length > 2) {
            newUrls.shift(); // Remove the oldest URL
          }

          set({ urls: newUrls });
        }
      },
      removeAllUrls: () => {
        set({ urls: [] });
      },
    }),
    {
      name: "url-storage", // name of the storage (localStorage or AsyncStorage, etc.)
    }
  )
);
