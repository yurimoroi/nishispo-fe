import { fileSizeValidation } from "@/components/feature/form";
import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form/lib/error-messages-map";

import { z } from "zod";

export const formAdminInformationsSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE_ALT.INFORMATIONS_TITLE_REQUIRED }),
    body: z
      .string()
      .min(1, { message: JP_ERROR_MESSAGE_ALT.INFORMATIONS_TEXT_REQUIRED }),
    uploadFile: fileSizeValidation(),
    releasePeriodStart: z.date({
      required_error: JP_ERROR_MESSAGE_ALT.RELEASE_PERIOD_START_REQUIRED,
    }),
    releasePeriodEnd: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.releasePeriodEnd) {
        const releasePeriodStart = new Date(data.releasePeriodStart);
        const releasePeriodEnd = new Date(data.releasePeriodEnd);
        return releasePeriodStart < releasePeriodEnd;
      }
      return true; // If no releasePeriodEnd, skip the check
    },
    {
      message: JP_ERROR_MESSAGE_ALT.INFORMATIONS_RELEASE_PERIOD_START_INVALID,
      path: ["releasePeriodStart"],
    },
  );
