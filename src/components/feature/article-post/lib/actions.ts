"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AddTagResponseType,
  ArticleTagResponse,
  ArticleOrganizationType,
  ArticleCategoryResponseType,
  ArticleImageDeleteResponseType,
  AffiliatedMediaListResponseType,
} from "./types";

export const addArticleTag = async (tag: string) => {
  const payload = {
    name: tag,
  };

  const response = await genericRequest({
    path: "/company/tags",
    method: "POST",
    isAdminPath: true,
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: AddTagResponseType = await response.json();

  return data;
};

export const getArticleTagList = async () => {
  const response = await genericRequest({
    path: "/company/tags",
    method: "GET",
    isAdminPath: true,
    options: {
      cache: "no-store",
    },
  });

  const data: ArticleTagResponse = await response.json();

  return data;
};

export const getArticleOrganizationList = async () => {
  const response = await genericRequest({
    path: "/organization",
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: ArticleOrganizationType = await response.json();
  return data;
};

export const getArticleCategories = async () => {
  const response = await genericRequest({
    path: "/company/categories",
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: ArticleCategoryResponseType = await response.json();

  return data;
};

export const deleteArticleImage = async (
  articleId: string,
  mediaId: number,
) => {
  const path = `/user/articles/${articleId}/media/${mediaId}/delete`;

  const response = await genericRequest({
    path: path,
    method: "DELETE",
  });

  const data: ArticleImageDeleteResponseType = await response.json();

  return data;
};

// #region AFFILIATED MEDIA
export const getAffiliatedMediaList = async () => {
  const path = `/align-media`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: AffiliatedMediaListResponseType = await response.json();

  return data;
};
// #endregion
