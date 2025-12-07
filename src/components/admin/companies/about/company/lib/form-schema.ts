import { z } from "zod";

export const aboutCompanyFormSchema = z.object({
  content: z.string().min(1, "利用規約は必須です"),
});
