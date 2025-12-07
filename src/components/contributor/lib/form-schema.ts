import {
  getListOfInvalidFiles,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form";
import { isBefore } from "date-fns";
import { z } from "zod";

export const commonArticleFields = {
  title: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ARTICLE_TITLE_REQUIRED }),
  body: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ARTICLE_BODY_REQUIRED }),

  // For multiple file uploads
  attachments: z
    .array(z.instanceof(File))
    .refine((files) => {
      const invalidFiles = getListOfInvalidFiles(files, 5000); // 5MB limit
      return invalidFiles.length === 0; // If false, will trigger validation message
    }, JP_ERROR_MESSAGE_ALT.ARTICLE_IMAGE_SINGLE_LIMIT)
    .refine((files) => {
      return !(files.length > 5); // If false, will trigger validation message
    }, JP_ERROR_MESSAGE_ALT.IMAGES_MAX_6),
  organization: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ARTICLE_BODY_REQUIRED }),
  tags: z.array(z.string()),
  // Keeping as reference
  // .refine(
  //   (tags) => {
  //     return !(tags.length === 0);
  //   },
  //   {
  //     message: JP_ERROR_MESSAGE_ALT.ARTICLE_TAG_REQUIRED,
  //   },
  // ),
  categories: z
    .array(z.string())
    .refine((categories) => categories.length > 0, {
      message: JP_ERROR_MESSAGE_ALT.ARTICLE_CATEGORY_REQUIRED,
    }),
  publishStart: z.date({
    required_error: JP_ERROR_MESSAGE_ALT.ARTICLE_PUBLISH_START_REQUIRED,
  }),
  publishEnd: z.date().optional(),
};

export const articleFormSchema = z
  .object({
    ...commonArticleFields,
    termOne: z.boolean().refine((val) => val === true, {
      message: JP_ERROR_MESSAGE_ALT.ARTICLE_TERM_AGREEMENT_REQUIRED,
    }),
    termTwo: z.boolean().refine((val) => val === true, {
      message: JP_ERROR_MESSAGE_ALT.ARTICLE_TERM_AGREEMENT_REQUIRED,
    }),
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
