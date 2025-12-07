"use client";

import React, { createContext, useContext, ReactNode } from "react";

type AdminArticlesContextType = {
  articleId: string;
  articleTitle: string;
  articleBody: string;
  organizationId: string;
  categories: string[];
  tags: string[];
  publishedAt: string;
  publishEndedAt: string;
  updatedAt: string;
  publishAtDiffForHumans?: string;
  articleStatus: string;
  articleStatusBtns: string[];
};

type AdminArticlesProviderProps = {
  value: AdminArticlesContextType;
  children: ReactNode;
};

const AdminArticlesContext = createContext<
  AdminArticlesContextType | undefined
>(undefined);

export const AdminArticlesProvider = ({
  value,
  children,
}: AdminArticlesProviderProps) => {
  return (
    <AdminArticlesContext.Provider value={value}>
      {children}
    </AdminArticlesContext.Provider>
  );
};

export const useAdminArticlesContext = (): AdminArticlesContextType => {
  const context = useContext(AdminArticlesContext);
  if (!context) {
    throw new Error(
      "useAdminArticlesContext must be used within an AdminArticlesProvider",
    );
  }
  return context;
};
