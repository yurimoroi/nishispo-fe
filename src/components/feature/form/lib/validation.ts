import { logFailedAPI } from "@/lib/utils";
import { checkIfEmailExists, checkIfUsernameExists } from "./actions";
import { JP_ERROR_MESSAGE_ALT } from "./error-messages-map";
import { z } from "zod";

export const checkIfUsernameExistsValidation = async (
  username: string,
): Promise<boolean> => {
  try {
    const response = await checkIfUsernameExists(username);
    // Note: Backend does not return success key when user already exists
    return typeof response?.success !== "undefined";
  } catch (error) {
    logFailedAPI("checkIfUsernameExists", error);
    return false;
  }
};

export const checkIfEmailExistsValidation = async (
  email: string,
): Promise<boolean> => {
  try {
    const response = await checkIfEmailExists(email);
    return response?.success ?? true;
  } catch (error) {
    logFailedAPI("checkIfEmailExists", error);
    return false;
  }
};

export const attachPasswordValidation = () => {
  const maxLength = 255;
  // Keeping for password reference =  abcdABCD1234, special characters not allowed
  return (
    z
      .string()
      // At least one capital letter and minimum 12 charactersnp
      .refine(
        (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])/.test(val ?? "") &&
          !(countCharactersWithJapaneseConsidered(val) < 12),
        {
          message: JP_ERROR_MESSAGE_ALT.PASSWORD_MIN_12,
        },
      )
      .refine(
        (val) =>
          !(
            countCharactersWithJapaneseConsidered(val) > maxLength ||
            countCharactersWithJapaneseConsidered(val) < 12
          ),
        {
          message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
            ":attribute",
            String(maxLength),
          ),
        },
      )
  );
  // Do not allow special characters, keeping code
  // .refine(
  //   (value) => /^[A-Za-z\d]*$/.test(value ?? ""),
  //   JP_ERROR_MESSAGE_ALT.INVALID_PASSWORD_FORMAT,
  // );
};

export const attachPasswordValidationNoMin = () => {
  return z
    .string()
    .refine(
      (value) => /^(?=.*[a-z])(?=.*[A-Z])/.test(value ?? ""),
      JP_ERROR_MESSAGE_ALT.INVALID_PASSWORD_FORMAT,
    );
};

export const attachPasswordRefine = (zodField: z.ZodString) => {
  return zodField.refine(
    (value) => /^(?=.*[a-z])(?=.*[A-Z])/.test(value ?? ""),
    JP_ERROR_MESSAGE_ALT.INVALID_PASSWORD_FORMAT,
  );
};

export const isFileSizeOverLimit = (file: File, sizeLimit: number = 500) => {
  return file.size > sizeLimit * 1024; // Check if file size is more than 500KB, if false will trigger validation
};

// This will list down files that are more than 500KB
export const getListOfInvalidFiles = (
  files: File[],
  sizeLimit: number = 500,
) => {
  return files.filter((file) => isFileSizeOverLimit(file, sizeLimit));
};

export const getInvalidFileNameList = (files: File[]) => {
  return files.map((file) => file.name).join(",");
};
export const generateInvalidFileNameListMessage = (
  message: string,
  files: File[],
) => {
  if (!files || files.length === 0) return "";
  return `${message} ${getInvalidFileNameList(getListOfInvalidFiles(files))}`;
};

export const fileSizeValidation = () => {
  return z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => {
      if (!file) return true;
      return !isFileSizeOverLimit(file, 500); // Check if file size is more than 500KB, if false will trigger validation
    }, JP_ERROR_MESSAGE_ALT.PROFILE_IMAGE_MAX_SIZE);

  // Keeping commented out code below for reference
  // return z.instanceof(File).refine((file) => {
  //   return !(file.size === 0);
  // }, `File is required.`);
  // return z.instanceof(File).optional().nullable();
};

export const countCharactersWithJapaneseConsidered = (text: string) => {
  let hiraganaCount = 0;
  let kanjiCount = 0;
  let katakanaCount = 0;
  let otherCount = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[\u3040-\u309f]/.test(char)) {
      hiraganaCount++;
    } else if (/[\u4e00-\u9fff]/.test(char)) {
      kanjiCount++;
    } else if (/[\u30a0-\u30ff]/.test(char)) {
      katakanaCount++;
    } else {
      otherCount++;
    }
  }

  return hiraganaCount + kanjiCount + katakanaCount + otherCount;
};

export const maxLengthWithJapaneseConsidered = (
  maxLength: number,
  errorMessage = "",
) => {
  return z
    .string()
    .refine(
      (val) => !(countCharactersWithJapaneseConsidered(val) > maxLength),
      {
        message:
          errorMessage ||
          JP_ERROR_MESSAGE_ALT.GENERIC_MAX_CHAR_LIMIT.replace(
            ":attribute",
            String(maxLength),
          ),
      },
    );
};

// This does not include the required field
export const attachPhoneNumberValidation = () => {
  return z
    .string()
    .max(30, { message: JP_ERROR_MESSAGE_ALT.MOBILE_PHONE_NUMBER_MAX })
    .refine((value) => {
      if (value === "") return true;
      // Check if the value contains only numbers and dashes
      return /^[0-9-]+$/.test(value);
    }, JP_ERROR_MESSAGE_ALT.PHONE_NUMBER_INVALID);
};
