import { JP_ERROR_MESSAGE } from "@/components/feature/form/lib/error-messages-map";
import { z } from "zod";

export const termsFormSchema = z.object({
  content: z.string().nonempty("利用規約は必須です"),
});
