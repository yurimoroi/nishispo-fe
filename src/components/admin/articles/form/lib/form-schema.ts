import { commonArticleFields } from "@/components/contributor";
import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form";
import { isBefore } from "date-fns";
import { z } from "zod";

// Almost the same with src\components\contributor\lib\form-schema.ts
// We will re-use commonArticleFields
export const articleAdminFormSchema = z
  .object({
    ...commonArticleFields,
    isPublished: z.boolean().refine((val) => val === true, {
      message: JP_ERROR_MESSAGE_ALT.GENERIC_CHECKBOX_REQUIRED,
    }),
    isPR: z.boolean(),
    affiliatedMedia: z
      .array(z.object({ id: z.string(), name: z.string(), url: z.string() }))
      .optional(),
  })
  .refine(
    (values) => {
      const startDate = values.publishStart;
      const endDate = values.publishEnd;

      if (!endDate) return true;

      return !isBefore(endDate, startDate);
    },
    {
      message: JP_ERROR_MESSAGE_ALT.ARTICLE_INVALID_DATE_RANGE,
      path: ["publishEnd"],
    },
  );
