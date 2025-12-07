import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isValid, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { prefectureValues } from ".";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const logFailedAPI = (label: string, error: any) => {
  console.warn(`Failed API call: ${label}`, error);
};

export const formatResponseError = (responseErrors: any) => {
  if (!responseErrors) {
    return "";
  }
  if (typeof responseErrors === "string") {
    return responseErrors;
  }
  return Object.entries(responseErrors)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
};

/**
 * Formats a date string in the format "YYYY-MM-DD HH:MM:SS"
 * to "YYYY.MM.DD".
 *
 * @param {Date} dateString - The date string to be formatted (e.g., "2024-09-12 09:53:57").
 * @returns {string} - The formatted date string in "YYYY.MM.DD" format.
 */
export function formatDate(dateString: Date): string {
  const date = new Date(dateString);

  return date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");
}

/**
 * Converts a date string in the format "YYYY/MM/DD HH:MM" to the
 * desired format "YYYY-MM-DD HH:MM:SS" if the date is valid, otherwise
 * returns an empty string.
 *
 * @param {string} [dateTime] - The date string to be converted.
 * @returns {string} The formatted date string in "YYYY-MM-DD HH:MM:SS" format if the date is valid, otherwise an empty string.
 */
export const formatDateTime = (dateTime?: string, delimiter = "-") => {
  if (!dateTime) return "";
  const regex = /(\d{4}\/\d{2}\/\d{2}) (\d{2}:\d{2})/;
  const match = dateTime.match(regex);

  if (match) {
    // If the time doesn't already have seconds, append ':00' to the time
    const timeWithSeconds = match[2].length === 5 ? `${match[2]}:00` : match[2];
    // Convert the date to the desired format (YYYY-MM-DD HH:MM:SS)
    const formattedDate = `${match[1].replace(/\//g, `${delimiter}`)} ${timeWithSeconds}`;
    return convertDateToJPDashWithTime(new Date(formattedDate), delimiter);
  }

  // Fallback to using  existing date conversion function if the format is already correct
  return convertDateToJPDashWithTime(new Date(dateTime), delimiter);
};

/**
 * Processes the input data and returns it. If the data is falsy, it returns a dash ("-").
 *
 * @param data - The input data to be processed.
 * @returns The input data, otherwise a dash ("-").
 */
export function processDataDefaultToDash(data: string) {
  return data && data.trim().length !== 0 ? data : "-";
}

/**
 * Converts a date string to a formatted Japanese date string.
 *
 * @param date - The date string to be converted.
 * @returns The formatted date string in "yyyy年MM月dd日" format if the date is valid, otherwise returns "-".
 */
export function convertDateToJP(date: string) {
  const parsedDate = parseISO(date);
  if (!isValid(parsedDate)) {
    return "-";
  }

  return format(parsedDate, "yyyy年MM月dd日", { locale: ja });
}

/**
 * Converts a date string to a formatted Japanese date string with time.
 *
 * @param date - The date string to be converted.
 * @returns The formatted date string in "yyyy-MM-dd HH:mm" format if the date is valid, otherwise returns "-".
 */
export const convertDateToJPDashWithTime = (date: Date, delimiter = "-") => {
  if (!isValid(date)) {
    return "-";
  }
  return format(date, `yyyy${delimiter}MM${delimiter}dd HH:mm:ss`, {
    locale: ja,
  });
};

export const convertDateToJPDot = (date: Date) => {
  if (!isValid(date)) {
    return "-";
  }
  return format(date, "yyyy.MM.dd", { locale: ja });
};

/**
 * Masks all characters in a string except for the last N characters.
 * This is commonly used to mask sensitive information such as credit card numbers.
 *
 * @param {string | null} value - The input string to be masked.
 * @param {number} [maskExceptLast=4] - The number of characters at the end of the string not to be masked.
 * @returns {string} The masked string.
 */
export const maskExceptLast = (
  value: string | null,
  maskExceptLast: number = 4,
) => {
  if (!value) return "-";
  if (value.length <= maskExceptLast) return value;
  return (
    "*".repeat(value.length - maskExceptLast) + value.slice(-maskExceptLast)
  );
};

/**
 * This is for generating a unique ID based on the timestamp and random number.
 *
 * @param {string} id - The ID to be appended to the unique ID.
 * @returns {string} - The unique ID.
 */
export const getUniqueId = (id?: string): string => {
  // Generate the unique ID based on the timestamp and random number
  const uniqueId = String(
    Date.now().toString(32) + Math.random().toString(16),
  ).replace(/\./g, "");

  return id ? uniqueId + id : uniqueId;
};

export const getConvertedSingleLinkToFile = async (
  link: string,
): Promise<File | null> => {
  if (!link) return null;

  // On local environment, the BE returns localhost link which does not work
  // On higher environments, replacing hostname is negligible code is negligible
  const finalLinkUrl = replaceLocalhost(link);

  const response = await fetch(
    `${process.env.basePathPDF || ""}/download/image?url=${finalLinkUrl}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "image/",
      },
    },
  );

  const blob = await response.blob();
  const fileName = link.split("/").pop() || "";
  const extension = fileName.split(".").pop() || "";
  const file = new File([blob], `${fileName}`, {
    type: `image/${extension}`,
  });

  return file;
};

/**
 * Replace localhost with 127.0.0.1:8000 for local development.
 * This is to prevent image error in local environment. Since BE returns localhost
 * @param {string} link - The link to be replaced.
 * @returns {string} - The replaced link.
 */
export const replaceLocalhost = (link: string) => {
  return link.replace(/localhost\//, "127.0.0.1:8000/");
};

export const replaceSlashWithDash = (value: string) => {
  return value.replace("/", "-");
};

export const getPrefectureLabelById = (id: string) => {
  return prefectureValues.find((prefecture) => prefecture.id === id)?.label;
};

export const getPrefectureIdByLabel = (label: string) => {
  return prefectureValues.find((prefecture) => prefecture.label === label)?.id;
};
