import {
  commonRegisterUserFields,
  validateMobileNumber,
  validatePhoneNumber,
} from "@/components/registration/lib/form-schema";
import { z } from "zod";
import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form";

// We ar re using fields for user registration to re-use validation
// Update code if needed, if more fields is more needed, update the code
export const registerAdminFormSchema = z
  .object({
    ...commonRegisterUserFields,
    isAdvertiser: z.boolean().optional(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: JP_ERROR_MESSAGE_ALT.PASSWORD_CONFIRMED,
      path: ["confirmPassword"],
    },
  )
  .refine(
    (values) => {
      if (!values.contributorFlag) {
        return true;
      }
      return (values?.advertiserName || "").trim().length > 0;
    },
    {
      message: JP_ERROR_MESSAGE_ALT.ADVERTISER_NAME_REQUIRED_IF,
      path: ["advertiserName"],
    },
  )
  // As per Seima's request this is not required for Phase 1
  // .refine(
  //   (values) => {
  //     if (!values.contributorFlag) {
  //       return true;
  //     }
  //     return (values?.rakutenId || "").trim().length > 0;
  //   },
  //   {
  //     message: JP_ERROR_MESSAGE_ALT.RAKUTEN_ID_REQUIRED,
  //     path: ["rakutenId"],
  //   },
  // );
  // Mobile phone number and phone number are required by default
  // If either number is inputted the other number will no longer be required
  .refine((value) => validateMobileNumber(value), {
    message: JP_ERROR_MESSAGE_ALT.PHONE_NUMBER_REQUIRED,
    path: ["mobilePhoneNumber"],
  })
  .refine((value) => validatePhoneNumber(value), {
    message: JP_ERROR_MESSAGE_ALT.PHONE_NUMBER_REQUIRED,
    path: ["phoneNumber"],
  });

export const adminUsersListFormSchema = z.object({
  role: z.array(z.string()).optional(),
  approvalStatus: z.string(),
  organizationName: z.string(),
  organizationLabel: z.string(),
  search: z.string(),
});
