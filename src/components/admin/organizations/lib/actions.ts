"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  OrganizationFormDataType,
  OrganizationsDetailsResponseType,
  OrganizationsResponseType,
} from "./types";

type GetLineupProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const getOrganizationsData = async ({
  searchParams,
}: GetLineupProps) => {
  searchParams.page = searchParams.page ? searchParams.page.toString() : "1";
  searchParams.perPage = searchParams.perPage
    ? searchParams.perPage.toString()
    : "5";

  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const path = queryString ? `/organizations?${queryString}` : "/organizations";

  const response = await genericRequest({
    path: path,
    method: "GET",
    options: {
      cache: "no-store",
    },
    isAdminPath: true,
  });

  const data: OrganizationsResponseType = await response.json();
  return data;
};

export const deleteOrganization = async (id: string | undefined) => {
  const path = `/organizations/${id}`;

  if (!id) {
    return null;
  }

  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: true,
  });

  const data: OrganizationsResponseType = await response.json();

  return data;
};

export const getOrganizationById = async (id: string) => {
  const path = `/organizations/${id}`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: OrganizationsDetailsResponseType = await response.json();

  return data;
};

export const createNewOrganization = async (formDataToSubmit: FormData) => {
  const response = await genericRequest({
    method: "POST",
    path: "/organizations",
    options: {
      body: formDataToSubmit,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: OrganizationsDetailsResponseType = await response.json();

  return data;
};

export const updatedOrganization = async (
  formDataToSubmit: FormData,
  orgId: string,
) => {
  const response = await genericRequest({
    method: "POST",
    path: `/organizations/${orgId}`,
    options: {
      body: formDataToSubmit,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: OrganizationsDetailsResponseType = await response.json();

  return data;
};
