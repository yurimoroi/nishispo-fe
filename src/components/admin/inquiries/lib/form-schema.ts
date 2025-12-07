import { z } from "zod";

export const formAdminInquiriesSchema = z.object({
  replyContent: z.string().min(1, { message: "返信内容は必須です" }),
});
