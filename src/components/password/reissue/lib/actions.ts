"use server";

import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { reissuePasswordFormSchema } from "./form-schema";
import { SendReissuePasswordRequestResponseType } from "./types";

export const sendReissuePasswordRequest = async (
  formData: z.infer<typeof reissuePasswordFormSchema>,
) => {
  const payload = {
    login_id: formData.loginId,
    email: formData.email,
  };

  const response = await genericRequest({
    path: "/profile/request-reset-password",
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: SendReissuePasswordRequestResponseType = await response.json();

  return data;
};
