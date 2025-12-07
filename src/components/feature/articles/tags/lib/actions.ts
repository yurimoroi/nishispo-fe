"use server";

import { genericRequest } from "@/lib/generic-action";
import { ArticlesTagListResponseType } from "./types";

export const getArticlesTagList = async ({ id, searchParams }: {
  id: string,
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const response = await genericRequest({
    path: `/tag/${id}?${queryString}`,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: ArticlesTagListResponseType = await response.json();
  return data;
}