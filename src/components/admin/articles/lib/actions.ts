"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminArticlesStatusResponseType,
  ArticleAdminDetailResponseType,
  CommonStatusUpdatedResponseType,
} from "./types";
import { ArticleSaveResponseType } from "@/components/contributor";

type GetAdminArticlesDataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const getAdminArticlesData = async ({
  searchParams,
}: GetAdminArticlesDataProps) => {
  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();
  const path = `/articles${queryString ? `?${queryString}` : ""}`;
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

  const data: any = await response.json();
  return data;
};

export const getAdminArticleStatus = async () => {
  const response = await genericRequest({
    path: "/articles/status/all",
    isAdminPath: true,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: AdminArticlesStatusResponseType = await response.json();
  return data;
};

export const getAdminArticleById = async (id: string) => {
  const path = `/articles/${id}`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: ArticleAdminDetailResponseType = await response.json();

  return data;
};

// #region ARTICLE STATUS
export const submitArticle = async (
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

// export const saveArticle = async (
//   formDataToSubmit: FormData,
//   idToEdit: string | undefined,
// ) => {
//   const path = `/articles${idToEdit ? `/${idToEdit}` : ""}`;

//   // BE has suggested to use POST instead of PUT (Laravel Issue), we need to add _method
//   if (idToEdit) {
//     formDataToSubmit.append("_method", "PUT");
//   }

//   const response = await genericRequest({
//     path: path,
//     method: "POST",
//     options: {
//       body: formDataToSubmit,
//     },
//     removeHeaderKey: "Content-Type",
//     // replaceContentType: "application/x-www-form-urlencoded", // Keeping as reference, BE suggested to use POST instead of PUT
//   });

//   const data: ArticleSaveResponseType = await response.json();

//   return data;
// };

export const approvePublishArticle = async (id: string) => {
  const path = `/articles/${id}/approved`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "POST",
  });

  const data: CommonStatusUpdatedResponseType = await response.json();

  return data;
};

export const editApprovedArticle = async (id: string) => {
  const path = `/articles/${id}/edit-approved`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "POST",
  });

  const data: CommonStatusUpdatedResponseType = await response.json();

  return data;
};

export const deleteApprovedArticle = async (id: string) => {
  const path = `/articles/${id}/delete-approved`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "DELETE",
  });

  const data: CommonStatusUpdatedResponseType = await response.json();

  return data;
};

export const withdrawEditDeleteRequest = async (id: string) => {
  const path = `/articles/${id}/request-withdrawal`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "DELETE",
  });

  const data: CommonStatusUpdatedResponseType = await response.json();
  return data;
};
// #endregion
