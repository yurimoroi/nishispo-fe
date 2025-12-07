"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminArticleCategoriesDataResponseType,
  AdminArticleCategoryByIdResponseType,
  CreateOrUpDateAdminArticleCategoryResponseType,
  CreateOrUpDateAdminArticleCategoryType,
} from "./types";
import { z } from "zod";
import { formArticleCategoriesSchema } from "./form-schema";

type CreateAdminArticleCategoryProps = {
  formData: z.infer<typeof formArticleCategoriesSchema>;
  idToUpdate?: string | number;
};

type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const getAdminArticleCategoriesData = async ({
  searchParams,
}: SearchParams) => {
  searchParams.page = searchParams.page ? searchParams.page.toString() : "1";
  searchParams.perPage = searchParams.perPage
    ? searchParams.perPage.toString()
    : "10";

  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const path = `/categories`;
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

  const data: AdminArticleCategoriesDataResponseType = await response.json();
  return data;
};

export const getAdminArticleCategoryById = async (id: string) => {
  const path = `/categories/${id}`;
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

  const data: AdminArticleCategoryByIdResponseType = await response.json();

  return data;
};

export const createOrUpdateAdminArticleCategory = async ({
  formData,
  idToUpdate,
}: CreateAdminArticleCategoryProps) => {
  const payload: CreateOrUpDateAdminArticleCategoryType = {
    name: formData.name,
    short_name: formData.shortName,
    color: formData.color,
    show_head_flg: formData.showHeadFlg,
    order: Number(formData.order),
  };
  const path = `/categories${idToUpdate ? `/${idToUpdate}` : ""}`;
  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: idToUpdate ? "PUT" : "POST",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
      body: JSON.stringify(payload),
    },
  });

  const data: CreateOrUpDateAdminArticleCategoryResponseType =
    await response.json();
  return data;
};
