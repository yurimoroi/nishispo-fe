import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form/lib/error-messages-map";
import {
  attachPasswordValidation,
  attachPhoneNumberValidation,
  checkIfEmailExistsValidation,
  checkIfUsernameExistsValidation,
  countCharactersWithJapaneseConsidered,
  fileSizeValidation,
} from "@/components/feature/form";

import { z } from "zod";
import { replaceMaxAttribute } from "@/components/feature/form/lib/utils";
import { useRegisterFromStore } from "./store";

const COMMON_MAX_100_LENGTH = 100;

const usernameField = () => {
  return z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.LOGIN_REQUIRED })
    .refine(
      (val) =>
        !(countCharactersWithJapaneseConsidered(val) > COMMON_MAX_100_LENGTH),
      {
        message: JP_ERROR_MESSAGE_ALT.LOGIN_MAX,
      },
    )
    .refine(async (data) => {
      // current login id is set on a useEffect inside form-register
      const currentLoginId = useRegisterFromStore.getState().currentLoginId;
      if (currentLoginId === data) {
        return true;
      }

      return await checkIfUsernameExistsValidation(data);
    }, JP_ERROR_MESSAGE_ALT.LOGIN_UNIQUE);
};

export const usernameSelectFormSchema = z.object({
  username: usernameField(),
});

export const validateMobileNumber = (value: {
  phoneNumber: string;
  mobilePhoneNumber: string;
}) => {
  if (value.phoneNumber.trim() !== "") {
    return true;
  }
  return value.mobilePhoneNumber.trim() !== "";
};

export const validatePhoneNumber = (value: {
  phoneNumber: string;
  mobilePhoneNumber: string;
}) => {
  if (value.mobilePhoneNumber.trim() !== "") {
    return true;
  }
  return value.phoneNumber.trim() !== "";
};

export const commonRegisterUserFields = {
  lastName: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.LAST_NAME_REQUIRED })
    .refine(
      (val) =>
        !(countCharactersWithJapaneseConsidered(val) > COMMON_MAX_100_LENGTH),
      {
        message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
          ":attribute",
          String(COMMON_MAX_100_LENGTH),
        ),
      },
    ),
  firstName: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.FIRST_NAME_REQUIRED })
    .refine(
      (val) =>
        !(countCharactersWithJapaneseConsidered(val) > COMMON_MAX_100_LENGTH),
      {
        message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
          ":attribute",
          String(COMMON_MAX_100_LENGTH),
        ),
      },
    ),
  lastNamePhonetic: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.LAST_NAME_PHONETIC_REQUIRED })
    .refine(
      (val) =>
        !(countCharactersWithJapaneseConsidered(val) > COMMON_MAX_100_LENGTH),
      {
        message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
          ":attribute",
          String(COMMON_MAX_100_LENGTH),
        ),
      },
    ),
  firstNamePhonetic: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.FIRST_NAME_PHONETIC_REQUIRED })
    .refine(
      (val) =>
        !(countCharactersWithJapaneseConsidered(val) > COMMON_MAX_100_LENGTH),
      {
        message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
          ":attribute",
          String(COMMON_MAX_100_LENGTH),
        ),
      },
    ),
  dateOfBirth: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.DATE_OF_BIRTH_REQUIRED }),
  gender: z.string(),
  // TODO Docs mentioned Post Code auto format to allow only number and there is an logic for auto populate
  // TODO Docs mentioned this is required on Groupware
  postCode: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.POST_CODE_REQUIRED })
    .refine((val) => !(countCharactersWithJapaneseConsidered(val) > 10), {
      message: JP_ERROR_MESSAGE_ALT.POST_CODE_MAX,
    }),
  // TODO Docs mentioned this is required on Groupware
  prefecture: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.PROVINCE_REQUIRED }),
  addressOne: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ADDRESS_ONE_REQUIRED })
    .refine((val) => !(countCharactersWithJapaneseConsidered(val) > 200), {
      message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
        ":attribute",
        String(200),
      ),
    }),
  addressTwo: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ADDRESS_TWO_REQUIRED })
    .refine((val) => !(countCharactersWithJapaneseConsidered(val) > 200), {
      message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
        ":attribute",
        String(200),
      ),
    }),
  addressThree: z
    .string()
    .refine((val) => !(countCharactersWithJapaneseConsidered(val) > 200), {
      message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
        ":attribute",
        String(200),
      ),
    }),
  // TODO Docs mentioned this is required on Groupware
  mobilePhoneNumber: attachPhoneNumberValidation(),
  // TODO Docs mentioned this is required on Groupware
  phoneNumber: attachPhoneNumberValidation(),
  // TODO Docs mentioned this is required on Groupware
  email: z
    .string()
    // .min(1, { message: JP_ERROR_MESSAGE_ALT.EMAIL_REQUIRED }) // commenting this out as it is not required on phase 1
    .max(255, {
      message: replaceMaxAttribute(JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR, 255),
    })
    .email({ message: JP_ERROR_MESSAGE_ALT.EMAIL_REQUIRED })
    .refine(async (data) => {
      // We need to check first the current value of the email to prevent validation on current email
      // Another approach would be for the backend to ignore the current user's email when validating during editing, but to save time we're doing it on the frontend instead
      const currentEmail = useRegisterFromStore.getState().currentEmail;

      // If the same value do not validate
      if (currentEmail === data) {
        return true; // True means no validation will trigger
      }
      const isExisting = await checkIfEmailExistsValidation(data); // If this returns true, then inputted email is ok to use

      return isExisting;
    }, JP_ERROR_MESSAGE_ALT.EMAIL_ALREADY_EXISTS),
  username: usernameField(),
  password: attachPasswordValidation(),
  confirmPassword: attachPasswordValidation(),

  nickname: z.string().max(100, {
    message: replaceMaxAttribute(JP_ERROR_MESSAGE_ALT.NICKNAME_MAX, 100),
  }),
  favoriteSport: z.string(),
  favoriteGourmet: z.string(),
  affiliateClubs: z.array(z.object({ id: z.string(), name: z.string() })),

  advertiserFlag: z.boolean().optional(),
  advertiserName: z
    .string()
    .refine((val) => !(countCharactersWithJapaneseConsidered(val) > 100), {
      message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
        ":attribute",
        String(100),
      ),
    })
    .optional(),
  rakutenId: z
    .string()
    // .min(1, { message: JP_ERROR_MESSAGE_ALT.RAKUTEN_ID_REQUIRED }) // TODO and NOTE no error message given and only required if groupware
    .refine((val) => !(countCharactersWithJapaneseConsidered(val) > 255), {
      message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
        ":attribute",
        String(255),
      ),
    }),
  uploadFile: fileSizeValidation(),
  contributorFlag: z.boolean().optional(),
};

export const registerFormSchema = z
  .object({
    ...commonRegisterUserFields,
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
