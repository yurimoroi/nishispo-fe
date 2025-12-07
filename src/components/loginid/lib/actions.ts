"use server";

import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { loginNotificationFormSchema } from "./form-schema";
import { SendLoginIdResponseType } from "./types";

export const sendLoginId = async (
  formData: z.infer<typeof loginNotificationFormSchema>,
) => {
  const payload = {
    email: formData.email,
  };

  const response = await genericRequest({
    path: "/profile/request-login-id",
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: SendLoginIdResponseType = await response.json();

  return data;
};
