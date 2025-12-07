import { z } from "zod";

export const postLimitFormSchema = z.object({
  orgMemberPostLimit: z.string(),
  orgPostLimit: z.string(),
  postLimit: z.string()
});