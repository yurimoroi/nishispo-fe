"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminOrganizationNameListResponseType,
  getAdminTeamsDataResponseType,
  TeamDetailsResponseType,
} from "./types";

export const getAdminOrganizationNameList = async (param?: string) => {
  const queryString = param ? `?filter[keyword]=${param}` : "";
  const path = `/events/search/org${queryString}`;
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

  const data: AdminOrganizationNameListResponseType = await response.json();
  return data;
};

type SearchParams = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const getAdminTeamsData = async ({
  searchParams = {},
}: SearchParams) => {
  searchParams.page = searchParams.page ? searchParams.page.toString() : "1";
  searchParams.perPage = searchParams.perPage
    ? searchParams.perPage.toString()
    : "10";

  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const path = "/events/search";
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

  const data: getAdminTeamsDataResponseType = await response.json();
  return data;
};

export const getTeamsDetailData = async (id: string) => {
  const path = `/events/${id}`;
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

  const data: TeamDetailsResponseType = await response.json();
  return data;
};

export const createNewTeam = async (formDataToSubmit: FormData) => {
  const response = await genericRequest({
    method: "POST",
    path: "/events",
    options: {
      body: formDataToSubmit,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: TeamDetailsResponseType = await response.json();

  return data;
};

export const updateNewTeam = async (formDataToSubmit: FormData, id: string) => {
  const response = await genericRequest({
    method: "POST",
    path: `/events/${id}`,
    options: {
      body: formDataToSubmit,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: TeamDetailsResponseType = await response.json();

  return data;
};
