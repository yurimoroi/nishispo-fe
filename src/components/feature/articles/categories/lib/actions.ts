"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  ArticlesCategoryListResponseType,
  ArticlesCategoryTopListResponseType,
} from "./types";
import { error } from "console";

export const getArticlesCategoryList = async () => {
  const response = await genericRequest({
    path: "/category/articles",
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: ArticlesCategoryListResponseType = await response.json();
  return data;
};

export const getArticlesCategoryTopList = async ({
  id,
  searchParams = {},
}: {
  id: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const response = await genericRequest({
    path: `/category/${id}?${queryString} `,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: ArticlesCategoryTopListResponseType = await response.json();
  return data;
};
