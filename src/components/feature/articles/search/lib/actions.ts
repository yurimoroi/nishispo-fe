"use server";

import { genericRequest } from "@/lib/generic-action";
import { ArticlesSearchResponseType } from "./types";

type GetArticlesSearchResultsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const getArticlesSearchResults = async ({ searchParams }: GetArticlesSearchResultsProps) => {
  // TODO: Replace with actual data
  let path = `/search`;
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  path = path + `?${queryString}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });
  const data: ArticlesSearchResponseType = await response.json();
  return data;
};
