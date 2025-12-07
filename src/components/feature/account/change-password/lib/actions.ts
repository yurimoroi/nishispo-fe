"use server";

import { genericRequest } from "@/lib/generic-action";
import { ChangePasswordResponseType } from "./types";
import { z } from "zod";
import { changePasswordFormSchema } from "./form-schema";

export const submitChangePassword = async (formData: z.infer<typeof changePasswordFormSchema>) => {
  const { currentPassword, password, confirmPassword } = formData;

  const payload = {
    old_password: currentPassword,
    password: password,
    password_confirmation: confirmPassword,
  };
  const response = await genericRequest({
    method: "POST",
    path: "/profile/change-password",
    options: {
      body: JSON.stringify(payload),
    },
  });

  const data: ChangePasswordResponseType = await response.json();

  return data;
};
