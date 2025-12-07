"use server";

import { genericRequest } from "@/lib/generic-action";
import { ArticleRankingResponseType, EventArticlesResponseType } from "./types";

export async function getArticlesRanking() {
  const path = `/rank/article`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: ArticleRankingResponseType = await response.json();

  return data;
}

export async function getEventArticles(categoryName: string) {
  const path = `/category/name/${categoryName}?limit=2`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: EventArticlesResponseType = await response.json();

  return data;
}
