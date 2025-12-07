"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminInformationsByIdResponseType,
  AdminInformationsResponseType,
  SubmitInformationResponse,
  SubmitInformationResponseType,
  UpdateInformationResponseType,
} from "./types";
import { UpdateInfo } from "next/dist/build/swc";

export const getAdminInformationsData = async () => {
  const path = "/information";
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

  const data: AdminInformationsResponseType = await response.json();
  return data;
};

export const getAdminInformationById = async (id: string) => {
  const path = `/information/${id}`;
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

  const data: AdminInformationsByIdResponseType = await response.json();
  return data;
};

export const submitInformation = async (formDataToSubmit: FormData) => {
  const response = await genericRequest({
    method: "POST",
    path: "/information",
    isAdminPath: true,
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: SubmitInformationResponseType = await response.json();
  return data;
};

export const updateInformation = async (
  formDataToSubmit: FormData,
  id: string,
) => {
  const response = await genericRequest({
    method: "POST",
    path: `/information/${id}`,
    isAdminPath: true,
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: UpdateInformationResponseType = await response.json();
  return data;
};
