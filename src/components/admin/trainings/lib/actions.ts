"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminTrainingsByIdResponseType,
  AdminTrainingsResponseType,
  CreateOrUpDateAdminTrainingsResponseType,
  CreateOrUpDateAdminTrainingsType,
} from "./types";
import { formAdminTrainingListSchema } from "./form-schema";
import { z } from "zod";

export const getAdminTrainingsData = async () => {
  const path = "/contributor-trainings";
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

  const data: AdminTrainingsResponseType = await response.json();
  return data;
};

export const getAdminTrainingById = async (id: string) => {
  const path = `/contributor-trainings/${id}`;
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

  const data: AdminTrainingsByIdResponseType = await response.json();
  return data;
};

type CreateOrEditAdminTrainingsProps = {
  formData: z.infer<typeof formAdminTrainingListSchema>;
  idToUpdate?: string | number;
};
export const createOrUpdateAdminTrainings = async ({
  formData,
  idToUpdate,
}: CreateOrEditAdminTrainingsProps) => {
  const payload: CreateOrUpDateAdminTrainingsType = {
    id: idToUpdate?.toString() || "",
    type: formData.trainingType,
    title: formData.title,
    url: formData.trainingUrl,
    no: formData.trainingNo,
    overview: formData.trainingOverview,
  };
  const path = `/contributor-trainings${idToUpdate ? `/${idToUpdate}` : ""}`;
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

  const data: CreateOrUpDateAdminTrainingsResponseType = await response.json();
  return data;
};
