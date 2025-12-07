import { fileSizeValidation } from "@/components/feature/form";
import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form/lib/error-messages-map";
import { z } from "zod";

export const formOrganizationSchema = z.object({
  name: z
    .string()
    .min(1, JP_ERROR_MESSAGE_ALT.INQUIRY_NAME_REQUIRED)
    .max(100, JP_ERROR_MESSAGE_ALT.INQUIRY_NAME_TOO_LONG),
  representativeName: z
    .string()
    .min(1, JP_ERROR_MESSAGE_ALT.ORGANIZATION_NAME_REQUIRED)
    .max(100, JP_ERROR_MESSAGE_ALT.INQUIRY_NAME_TOO_LONG),
  activityDescription: z.string().optional(),
  // TODO Docs mentioned this is required on Groupware
  telNumber: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ORGANIZATION_PHONE_REQUIRED })
    .max(30, { message: JP_ERROR_MESSAGE_ALT.ORG_PHONE_MAX })
    .regex(/^[0-9+\-\s]+$/, {
      message: JP_ERROR_MESSAGE_ALT.ORG_INVALID_PHONE_NUMBER,
    }),
  email: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.EMAIL_REQUIRED })
    .email({ message: JP_ERROR_MESSAGE_ALT.ORG_INVALID_EMAIL_FORMAT })
    .max(255, { message: JP_ERROR_MESSAGE_ALT.ORG_EMAIL_MAX }),
  uploadFile: fileSizeValidation(),
  birthyearViewingFlg: z
    .preprocess((val) => (val === 1 || val === 0 ? val : undefined), z.number())
    .optional(),
  birthdateViewingFlg: z
    .preprocess((val) => (val === 1 || val === 0 ? val : undefined), z.number())
    .optional(),
  postalCodeViewingFlg: z
    .preprocess((val) => (val === 1 || val === 0 ? val : undefined), z.number())
    .optional(),
  addressViewingFlg: z
    .preprocess((val) => (val === 1 || val === 0 ? val : undefined), z.number())
    .optional(),
  phoneNumberViewingFlg: z
    .preprocess((val) => (val === 1 || val === 0 ? val : undefined), z.number())
    .optional(),
  mobilePhoneNumberViewingFlg: z
    .preprocess((val) => (val === 1 || val === 0 ? val : undefined), z.number())
    .optional(),
  emailViewingFlg: z
    .preprocess((val) => (val === 1 || val === 0 ? val : undefined), z.number())
    .optional(),
  selectedMembers: z
    .array(z.string())
    .min(1, { message: JP_ERROR_MESSAGE_ALT.USERS_SELECTION_REQUIRED }),
});
