"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  UserInformationByIdResponseType,
  UserInformationsResponseType,
} from "./types";

type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export const getUserInformationsData = async ({
  searchParams,
}: SearchParams) => {
  searchParams.page = searchParams.page ? searchParams.page.toString() : "1";
  searchParams.perPage = searchParams.perPage
    ? searchParams.perPage.toString()
    : "10";

  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const path = "/notice";
  const response = await genericRequest({
    path: `${path}?${queryString}`,
    isAdminPath: false,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: UserInformationsResponseType = await response.json();
  return data;
};

export const getUserInformationsById = async (id: string) => {
  const path = `/notice/${id}`;
  const response = await genericRequest({
    path: path,
    isAdminPath: false,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: UserInformationByIdResponseType = await response.json();
  return data;
};
