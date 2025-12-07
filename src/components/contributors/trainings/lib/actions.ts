"use server";
import { genericRequest } from "@/lib/generic-action";
import { ContributorsTrainingsResponseType } from "./types";

export const getContributorTrainings = async () => {
  const response = await genericRequest({
    path: "/contributor-trainings",
    method: "GET",
    options: {
      cache: "no-store",
    },
  });

  const data: ContributorsTrainingsResponseType = await response.json();
  return data;
};

export const SetTrainingToCompleted = async (trainingId: string) => {
  const path = `/user-contributor-trainings`;
  const payload: { contributor_training_id: string } = {
    contributor_training_id: trainingId,
  };

  const response = await genericRequest({
    path: path,
    method: "POST",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: ContributorsTrainingsResponseType = await response.json();

  return data;
};
