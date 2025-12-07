import { fileSizeValidation } from "@/components/feature/form";
import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form/lib/error-messages-map";
import { z } from "zod";

export const formAlignMediaSchema = z
  .object({
    name: z.string().min(1, JP_ERROR_MESSAGE_ALT.ALIGN_MEDIA_NAME_REQUIRED),
    banner: fileSizeValidation(),
    url: z.string().min(1, JP_ERROR_MESSAGE_ALT.ORGANIZATION_NAME_REQUIRED),
    displayTopFlg: z
      .preprocess(
        (val) => (val === 1 || val === 0 ? val : undefined),
        z.number(),
      )
      .optional(),
    displayArticleListFlg: z
      .preprocess(
        (val) => (val === 1 || val === 0 ? val : undefined),
        z.number(),
      )
      .optional(),
    displayFlg: z
      .preprocess(
        (val) => (val === 1 || val === 0 ? val : undefined),
        z.number(),
      )
      .optional(),
    note: z.string().optional(),
    startedAt: z
      .string({ message: JP_ERROR_MESSAGE_ALT.START_DATE_REQUIRED })
      .min(1, { message: JP_ERROR_MESSAGE_ALT.START_DATE_REQUIRED }),
    endedAt: z.string().optional(),
    order: z.preprocess(
      (value) => (typeof value === "string" ? parseFloat(value) : value),
      z.number({
        invalid_type_error: "順序は数値でなければなりません。",
      }),
    ),
  })
  .refine(
    (data) => {
      const publishedAtDate = new Date(data.startedAt as string);
      const publishEndedAtDate = data.endedAt
        ? new Date(data.endedAt as string)
        : null;

      const isValid = publishEndedAtDate
        ? publishedAtDate < publishEndedAtDate
        : true;

      return isValid;
    },
    {
      message: JP_ERROR_MESSAGE_ALT.ALIGN_MEDIA_DATE_CONDITION,
      path: ["startedAt"], // Target the `endedAt` field
    },
  );
