import { PropsWithChildren } from "react";

export type DeleteGenericItemApiResponseType = {
  success: boolean;
  message: string;
  data: null;
};

export enum ContributorStatus {
  NotSubmitted = 0,
  InTraining = 1,
  TrainingCompleted = 2,
  Approved = 3,
}

export type CommonProps = PropsWithChildren & {
  className?: string;
};