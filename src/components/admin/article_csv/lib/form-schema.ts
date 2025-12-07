import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form/lib/error-messages-map";

import { z } from "zod";

export const formAdminCsvSchema = z.object({
  outputPeriodStart: z.date(),
  outputPeriodEnd: z.date(),
});
