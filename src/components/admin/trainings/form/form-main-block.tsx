"use client";

import MainBlock from "@/components/feature/wrapper/main-block";
import { cn } from "@/lib/utils";
import { FormAdminTrainingsCreateEdit } from "./form";
import { AdminTrainingsByIdResponseType } from "../lib";

type FormMainBlockProps = {
  response?: AdminTrainingsByIdResponseType | null;
  className?: string;
};

export const FormMainBlock = ({
  response,
  className = "",
}: FormMainBlockProps) => {
  return (
    <MainBlock className={cn("", className)}>
      <span className="mb-[.625rem] block text-sm font-bold">研修作成</span>
      <FormAdminTrainingsCreateEdit response={response} />
    </MainBlock>
  );
};
