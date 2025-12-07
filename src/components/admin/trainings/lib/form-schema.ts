import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form/lib/error-messages-map";

import { z } from "zod";

export const formAdminTrainingListSchema = z.object({
  trainingNo: z.string(),
  title: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.TRAINING_TITLE_REQUIRED }),
  trainingType: z.string(),
  trainingOverview: z.string(),
  trainingUrl: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.TRAINING_URL_REQUIRED })
    .url({ message: JP_ERROR_MESSAGE_ALT.TRAINING_URL_INVALID }),
});
