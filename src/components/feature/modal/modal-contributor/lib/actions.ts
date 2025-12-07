"use server";

import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { contributorFormSchema } from "./form-schema";
import { ContributorApplyResponseType } from "./types";
export const sendContributorApplication = async (
  formData: z.infer<typeof contributorFormSchema>,
) => {
  const payload = {
    contributor_name: formData.authorName,
    rakuten_id: formData.rakutenID,
  };

  const response = await genericRequest({
    path: "/user/contributor-application",
    method: "PUT",
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: ContributorApplyResponseType = await response.json();

  return data;
};
