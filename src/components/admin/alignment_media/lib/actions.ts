"use server";

import { genericRequest } from "@/lib/generic-action";
import { AlignMediaDetailsResponseType, AlignMediaResponseType } from "./types";

export const getAlignMedia = async () => {
  const path = "/align-media";

  const response = await genericRequest({
    path: path,
    method: "GET",
    options: {
      cache: "no-store",
    },
    isAdminPath: true,
  });

  const data: AlignMediaResponseType = await response.json();
  return data;
};

export const getAlignMediaById = async (id: string) => {
  const path = `/align-media/${id}`;

  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: AlignMediaDetailsResponseType = await response.json();

  return data;
};

export const createNewAlignMedia = async (formDataToSubmit: FormData) => {
  const response = await genericRequest({
    method: "POST",
    path: "/align-media",
    options: {
      body: formDataToSubmit,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: AlignMediaDetailsResponseType = await response.json();

  return data;
};

export const updateAlignMedia = async (
  formDataToSubmit: FormData,
  id: string,
) => {
  const response = await genericRequest({
    method: "POST",
    path: `/align-media/${id}`,
    options: {
      body: formDataToSubmit,
    },
    isAdminPath: true,
    removeHeaderKey: "Content-Type",
  });

  const data: AlignMediaDetailsResponseType = await response.json();

  return data;
};

export const deleteAlignMedia = async (id: string | undefined) => {
  const path = `/align-media/${id}`;

  if (!id) {
    return null;
  }

  const response = await genericRequest({
    path: path,
    method: "DELETE",
    isAdminPath: true,
  });

  const data: AlignMediaResponseType = await response.json();

  return data;
};
