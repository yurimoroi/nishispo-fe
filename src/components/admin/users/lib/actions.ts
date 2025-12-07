"use server";

import { RegistrationResponseType } from "@/components/registration/lib/types";
import { genericRequest } from "@/lib/generic-action";
import {
  AdminUsersDataResponseType,
  ContributorStatusNameListResponseType,
} from "./types";

export const updateAdminUserProfile = async (
  formDataToSubmit: FormData,
  userId: string,
) => {
  const path = `/users/${userId}`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    isAdminPath: true,
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  // we reused saveArticle response, update if needed
  const data: RegistrationResponseType = await response.json();

  return data;
};

type SearchParamsType = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const getAdminUsersListData = async ({
  searchParams,
}: SearchParamsType) => {
  searchParams.page = searchParams.page ? searchParams.page.toString() : "1";
  searchParams.perPage = searchParams.perPage
    ? searchParams.perPage.toString()
    : "10";

  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const path = "/users";
  const response = await genericRequest({
    path: `${path}?${queryString}`,
    method: "GET",
    isAdminPath: true,
    headerOptions: {
      "Content-Type": "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: AdminUsersDataResponseType = await response.json();
  return data;
};

export const downloadAdminUsersCsv = async () => {
  const path = "/users/export";
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
    headerOptions: {
      "Content-Type": "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  return response;
};

export const getContributorStatusNameList = async () => {
  const path = "/users/contributor/status";
  const response = await genericRequest({
    path: path,
    method: "GET",
    isAdminPath: true,
    headerOptions: {
      "Content-Type": "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: ContributorStatusNameListResponseType = await response.json();
  return data;
};
