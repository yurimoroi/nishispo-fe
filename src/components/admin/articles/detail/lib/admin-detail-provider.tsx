"use client"; // 0. set use client

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

// 1. Define Store Type
export type AdminArticleDetailStore = {
  articleId: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

// 2. Set Context
const AdminDetailContext = createContext<
  StoreApi<AdminArticleDetailStore> | undefined
>(undefined);

// 3. Create Provider
type AdminDetailProviderProps = PropsWithChildren & {
  articleId: string;
};
// 4. Create Provider
export const AdminArticleDetailProvider = ({
  children,
  articleId
}: AdminDetailProviderProps) => {
  // 4.1 Create Store
  const [store] = useState(() =>
    createStore<AdminArticleDetailStore>((set) => ({
      articleId, 
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    })),
  );

  return (
    <AdminDetailContext.Provider value={store}>
      {children}
    </AdminDetailContext.Provider>
  );
};

// 5. Create Hook
export const useAdminDetailStore = <T,>(
  selector: (state: AdminArticleDetailStore) => T,
): T => {
  const context = useContext(AdminDetailContext);

  if (context === undefined) {
    throw new Error(
      "useAdminDetailStore must be used within AdminDetailProvider",
    );
  }

  return useStore(context, selector);
};
