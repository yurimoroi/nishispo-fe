"use server";

import { genericRequest } from "@/lib/generic-action";
import { z } from "zod";
import { resetPasswordFormSchema } from "./form-schema";
import { ResetPasswordResponseType } from "./types";

export const sendResetPasswordRequest = async (
  formData: z.infer<typeof resetPasswordFormSchema> & {
    token: string;
    email: string;
  },
) => {
  const payload = {
    password: formData.password,
    password_confirmation: formData.confirmPassword,
    token: formData.token,
    email: formData.email,
  };

  const response = await genericRequest({
    path: "/profile/reset-password",
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: ResetPasswordResponseType = await response.json();

  return data;
};
