import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form";
import { z } from "zod";

export const articleRequestFormSchema = z.object({
  requestType: z.string(),
  reason: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ARTICLE_REQUEST_REASON }),
});
