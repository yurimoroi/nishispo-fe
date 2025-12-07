"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminTopArticlesByIdResponseType,
  AdminTopArticlesResponseType,
  ArticlesDataFromPopupResponseType,
  CreateOrUpdateAdminTopArticleResponseType,
  CreateOrUpdateAdminTopArticleType,
  GetArticleByArticleIdResponseType,
} from "./types";
import { formAdminTopArticlesSchema } from "./form-schema";
import { z } from "zod";
import { convertDateToJPDashWithTime } from "@/lib/utils";
import { filtersParamKeys } from "./param-keys";

type CreateOrUpdateAdminTopArticleProps = {
  formData: z.infer<typeof formAdminTopArticlesSchema>;
  idsToUpdate?: {
    topArticleId?: string;
    articleId?: string;
  };
  method: "POST" | "PUT";
};

type FilterParams = {
  filters: {
    status?: string;
    freeWord?: string;
    categoryItems?: string[];
    publishedAt?: string;
    publishEndedAt?: string;
  };
  pageNumber?: number;
};

type SearchParamsType = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const getArticlesDataFromPopup = async ({
  filters,
  pageNumber,
}: FilterParams) => {
  const queryParams: string[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (key === "status") {
        if (typeof value === "string") {
          queryParams.push(
            `${filtersParamKeys.status}=${encodeURIComponent(value)}`,
          );
        }
      } else if (key === "freeWord" && typeof value === "string") {
        queryParams.push(
          `${filtersParamKeys.search}=${encodeURIComponent(value)}`,
        );
      } else if (key === "categoryItems" && Array.isArray(value)) {
        const categoryItemsString = value.join(",");
        queryParams.push(
          `${filtersParamKeys.categories}=${encodeURIComponent(categoryItemsString)}`,
        );
      } else if (key === "publishedAt" && filters.publishEndedAt) {
        const publishedAt = filters.publishedAt;
        const publishEndedAt = filters.publishEndedAt;

        if (publishedAt && publishEndedAt) {
          const formattedPublishedAt = new Date(publishedAt)
            .toISOString()
            .split("T")[0];
          const formattedPublishEndedAt = new Date(publishEndedAt)
            .toISOString()
            .split("T")[0];

          queryParams.push(
            `${filtersParamKeys.dates}=${encodeURIComponent(formattedPublishedAt)},${encodeURIComponent(formattedPublishEndedAt)}`,
          );
        }
      }
    }
  });

  // Add pageNumber to queryParams if it is defined
  if (pageNumber !== undefined) {
    queryParams.push(`page=${pageNumber}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  const path = `/articles/to/top${queryString}`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: ArticlesDataFromPopupResponseType = await response.json();
  return data;
};

export const getAdminTopArticlesData = async ({
  searchParams,
}: SearchParamsType) => {
  searchParams.page = searchParams.page ? searchParams?.page.toString() : "1";
  searchParams.perPage = searchParams?.perPage
    ? searchParams?.perPage.toString()
    : "10";

  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const path = "/top-articles";
  const response = await genericRequest({
    path: `${path}?${queryString}`,
    isAdminPath: true,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: AdminTopArticlesResponseType = await response.json();
  return data;
};

export const getAdminArticleByArticleId = async (id: string) => {
  const path = `/articles/${id}`;
  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: GetArticleByArticleIdResponseType = await response.json();
  return data;
};

export const getAdminTopArticlesById = async (id: string) => {
  const path = `/top-articles/${id}`;
  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: AdminTopArticlesByIdResponseType = await response.json();

  return data;
};

export const createOrUpdateAdminTopArticle = async ({
  formData,
  idsToUpdate,
  method,
}: CreateOrUpdateAdminTopArticleProps) => {
  // Initialize the payload without the article_id
  const payload: Partial<CreateOrUpdateAdminTopArticleType> = {
    order: formData.order,
    published_at: convertDateToJPDashWithTime(formData.publishedAt),
    publish_ended_at:
      formData.publishEndedAt !== undefined
        ? convertDateToJPDashWithTime(formData.publishEndedAt)
        : null,
  };

  // For POST, include article_id in the payload
  if (method === "POST") {
    payload.article_id = idsToUpdate?.articleId;
  }

  // For PUT, do not include article_id in the payload
  if (method === "PUT" && idsToUpdate?.topArticleId) {
    delete payload.article_id;
  }

  let path = "/top-articles";

  if (method === "PUT" && idsToUpdate?.topArticleId) {
    path = `/top-articles/${idsToUpdate.topArticleId}`;
  }

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method,
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
      body: JSON.stringify(payload),
    },
  });

  const data: CreateOrUpdateAdminTopArticleResponseType = await response.json();
  return data;
};
