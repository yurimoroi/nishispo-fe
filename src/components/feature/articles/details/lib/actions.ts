"use server";

import { genericRequest } from "@/lib/generic-action";
import { ArticleDetailsResponseType } from "./types";

export async function getArticleById(id: string) {
  const path = `/articles/${id}`;
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

  const data: ArticleDetailsResponseType = await response.json();
  return data;
}
