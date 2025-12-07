import { z } from "zod";

export const adFormSchema = z.object({
  content: z.string().min(1, "利用規約は必須です"),
});
