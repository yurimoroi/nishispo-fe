"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  ArticleDetailResponseType,
  ArticleSaveResponseType,
  ArticlesStatusResponseType,
  UserArticlesCountResponseType,
  UserArticlesResponseType,
} from "./types";

type GetUserArticlesDataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const saveArticle = async (
  formDataToSubmit: FormData,
  idToEdit: string | undefined,
) => {
  const path = `/user/articles${idToEdit ? `/${idToEdit}/save` : ""}`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
    // replaceContentType: "application/x-www-form-urlencoded", // Keeping as reference, BE suggested to use POST instead of PUT
  });

  const data: ArticleSaveResponseType = await response.json();
  return data;
};

export const getArticleDetails = async (id: string) => {
  const path = `/user/articles/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: ArticleDetailResponseType = await response.json();

  return data;
};

export const deleteArticle = async (id: string | undefined) => {
  const path = `/user/articles/${id}`;

  if (!id) {
    return null;
  }

  const response = await genericRequest({
    path: path,
    method: "DELETE",
  });

  const data: ArticleDetailResponseType = await response.json();

  return data;
};

export const withdrawEditDeleteRequest = async (articleId: string) => {
  const path = `/user/articles/${articleId}/request-withdrawal`;
  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: false,
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: ArticleDetailResponseType = await response.json();
  return data;
};

// submitArticle is different from saveArticle
export const submitArticle = async (
  formDataToSubmit: FormData,
  articleId: string,
) => {
  const path = `/user/articles/${articleId}/submit`;
  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  // We just reuse saveArticle response
  const data: ArticleSaveResponseType = await response.json();
  return data;
};

export const getUserArticlesData = async ({
  searchParams,
}: GetUserArticlesDataProps) => {
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();
  const path = `/user/articles${queryString ? `?${queryString}` : ""}`;
  const response = await genericRequest({
    path: path,
    isAdminPath: false,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: UserArticlesResponseType = await response.json();
  return data;
};

export const getUserArticlesCountDetails = async () => {
  const path = `/user/articles/count`;
  const response = await genericRequest({
    path: path,
    isAdminPath: false,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: UserArticlesCountResponseType = await response.json();
  return data;
};

export const withdrawRequest = async (articleId: string) => {
  const path = `articles/${articleId}/request-withdrawal`;
  const response = await genericRequest({
    path: path,
    method: "POST",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: any = await response.json();
  return data;
};

export const getUserArticleStatus = async () => {
  const response = await genericRequest({
    path: "/user/article/status",
    isAdminPath: false,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: ArticlesStatusResponseType = await response.json();
  return data;
};

// #region ADMIN ARTICLE CONTRIBUTOR
export const saveAdminArticle = async (
  formDataToSubmit: FormData,
  idToEdit: string | undefined,
) => {
  const path = `/articles${idToEdit ? `/${idToEdit}/save` : ""}`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: ArticleSaveResponseType = await response.json();

  return data;
};

export const getAdminArticleDetails = async (id: string) => {
  const path = `/articles/${id}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
    options: {
      cache: "no-store",
    },
  });

  const data: ArticleDetailResponseType = await response.json();

  return data;
};

export const submitAdminArticle = async (
  formDataToSubmit: FormData,
  articleId: string,
) => {
  const path = `/articles/${articleId}/submit`;
  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  // We just reuse saveArticle response
  const data: ArticleSaveResponseType = await response.json();

  return data;
};

// #endregion
