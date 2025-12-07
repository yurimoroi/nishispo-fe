"use client";

import React, { createContext, useContext, ReactNode } from "react";

type UserArticlesContextType = {
  articleId: string;
  articleTitle: string;
  articleBody: string;
  organizationId: string;
  categories: string[];
  tags: string[];
  publishedAt: string;
  publishEndedAt: string;
  createdAt: string;
  updatedAt: string;
  unSubmittedEdits?: boolean;
  articleStatus: string;
  articleStatusBtns: string[];
};

type UserArticlesProviderProps = {
  value: UserArticlesContextType;
  children: ReactNode;
};

const UserArticlesContext = createContext<UserArticlesContextType | undefined>(
  undefined,
);

export const UserArticlesProvider = ({
  value,
  children,
}: UserArticlesProviderProps) => {
  return (
    <UserArticlesContext.Provider value={value}>
      {children}
    </UserArticlesContext.Provider>
  );
};

export const useUserArticlesContext = (): UserArticlesContextType => {
  const context = useContext(UserArticlesContext);
  if (!context) {
    throw new Error(
      "useUserArticlesContext must be used within an UserArticlesProvider",
    );
  }
  return context;
};
