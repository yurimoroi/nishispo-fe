import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form/lib/error-messages-map";
import { z } from "zod";

export const inquiryFormSchema = z.object({
  name: z.string().min(1, JP_ERROR_MESSAGE_ALT.INQUIRY_NAME_REQUIRED),
  subject: z.string(),
  body: z.string().min(1, JP_ERROR_MESSAGE_ALT.INQUIRY_MESSAGE_REQUIRED),
  email: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.EMAIL_REQUIRED })
    .email({ message: JP_ERROR_MESSAGE_ALT.EMAIL_INVALID_FORMAT }),
});
