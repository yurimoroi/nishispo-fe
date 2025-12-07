"use client";

import MainBlock from "@/components/feature/wrapper/main-block";
import { cn } from "@/lib/utils";
import { FormAdminInformationsCreateEdit } from "./form";
import {
  AdminInformationsByIdResponseType,
} from "../lib";

type FormMainBlockProps = {
  response?: AdminInformationsByIdResponseType;
  className?: string;
};

export const FormMainBlock = ({
  response,
  className = "",
}: FormMainBlockProps) => {
  return (
    <MainBlock className={cn("", className)}>
      <span className="mb-[.625rem] block text-sm font-bold">
        {response ? "お知らせ編集" : "お知らせ新規作成"}
      </span>
      <FormAdminInformationsCreateEdit response={response} />
    </MainBlock>
  );
};
