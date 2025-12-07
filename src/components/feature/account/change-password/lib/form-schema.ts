import {
  attachPasswordValidation,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form";
import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE_ALT.CURRENT_PASSWORD_REQUIRED }),
    password: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE_ALT.NEW_PASSWORD_REQUIRED })
      .pipe(attachPasswordValidation()),
    confirmPassword: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE_ALT.NEW_PASSWORD_CONFIRM_REQUIRED })
      .pipe(attachPasswordValidation()),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "パスワードが一致しません",
      path: ["confirmPassword"],
    },
  );
