import { JP_ERROR_MESSAGE } from "@/components/feature/form/lib/error-messages-map";
import { z } from "zod";

export const remandFormSchema = z.object({
  titleRemand: z.string(),
  bodyRemand: z.string(),
  imageRemand: z.string(),
  otherRemand: z.string(),
});
