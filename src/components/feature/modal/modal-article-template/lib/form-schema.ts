import { z } from "zod";

export const articleTemplateFormSchema = z.object({
  title: z.string(),
  body: z.string(),
});
