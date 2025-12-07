"use server";

import { z } from "zod";
import { genericRequest } from "@/lib/generic-action";
import { CompanyResponseType } from "./types";
import { termsFormSchema } from "@/components/admin/terms/lib";

export const getCompanyData = async () => {
  const response = await genericRequest({
    path: "/company",
    method: "GET",
    options: {
      cache: "no-store",
    },
    isAdminPath: true,
  });

  const data: CompanyResponseType = await response.json();
  return data;
};

export const setCompanyData = async (
  column: string,
  formData: z.infer<typeof termsFormSchema>,
) => {
  const path = `/info`;
  const payload: Record<string, string> = {
    [column]: formData.content,
  };

  const response = await genericRequest({
    path: path,
    method: "PATCH",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      body: JSON.stringify(payload),
      cache: "no-store",
    },
    isAdminPath: true,
  });

  const data: CompanyResponseType = await response.json();
  return data;
};

function cleanString(input: string): string {
  return input
    .replace(/\\n/g, "") // Remove escaped newlines
    .replace(/\\'/g, "'") // Replace escaped single quotes
    .replace(/^\s+/gm, "") // Trim leading spaces for each line
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim(); // Trim the final string
}
