import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form";
import { z } from "zod";

export const loginNotificationFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.EMAIL_REQUIRED })
    .email(JP_ERROR_MESSAGE_ALT.EMAIL_INVALID_FORMAT),
});
