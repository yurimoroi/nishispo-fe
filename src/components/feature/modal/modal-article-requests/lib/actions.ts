"use server";

import { genericRequest } from "@/lib/generic-action";
import { ArticleRequestResponseType } from "./types";

export const sendEditArticleRequest = async (
  formData: FormData,
  articleId: string,
) => {
  // We are using the same API endpoint for saving, and just passing  additional parameters request_type and comments
  const path = `/user/articles/${articleId}/save`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: formData,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: ArticleRequestResponseType = await response.json();
  return data;
};

export const sendDeleteArticleRequest = async (
  formData: FormData,
  articleId: string,
) => {
  const path = `/user/articles/${articleId}/delete-request`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: formData,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: ArticleRequestResponseType = await response.json();
  return data;
};
