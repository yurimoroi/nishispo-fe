import { create } from "zustand";

type previousURLStore = {
  previousURLs: string[];
};

export const usePreviousURLStore = create<previousURLStore>()((set, get) => ({
  previousURLs: [],
}));

export const pushCurrentURL = (url: string) => {
  const previousURLs = usePreviousURLStore.getState().previousURLs;
  if (url === previousURLs[1]) {
    return;
  }
  if (previousURLs.length >= 2) {
    previousURLs.shift();
  }
  usePreviousURLStore.setState({ previousURLs: [...previousURLs, url] });
};
