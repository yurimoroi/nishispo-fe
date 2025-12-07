import { create } from "zustand";

type PageStore = {
  pageNumber: string;
  setPageNumber: (newPage: string) => void;
  getPageNumber: () => string;
};

// Create the Zustand store with typed state
const usePageStore = create<PageStore>((set, get) => ({
  pageNumber: "1",
  setPageNumber: (newPage: string) => set({ pageNumber: newPage }), // Setter to update pageNumber
  getPageNumber: () => get().pageNumber, 
}));

export default usePageStore;
