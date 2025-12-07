import { auth } from "@/app/auth";
import { headers } from "next/headers";
/**
 * Retrieves additional header metadata, such as the user agent and X-Forwarded-For headers, from the Next.js request context.
 * So we can pass additional data to the backend
 * @returns An object containing the additional header metadata.
 */
const getAdditionalHeaderMetaData = async () => {
  const headersList = headers();
  const session = await auth();

  return {
    "User-Agent": headersList.get("user-agent") || "",
    "X-Forwarded-For": headersList.get("x-forwarded-for") || "",
    Authorization: `Bearer ${session?.user?.accessToken || ""}`,
  };
};

type GenericRequestProps = {
  path: string;
  overridePath?: boolean;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headerOptions?: object;
  options?: object;
  removeHeaderKey?: "Content-Type"; // You can add more keys here like method param
  isAdminPath?: boolean;
  replaceContentType?: string;
};

/**
 * Sends a generic HTTP request to the specified path with the given method, headers, options, and body.
 *
 * @param path - The URL path to send the request to must start with "/" e.g., "/inquiry".
 * @param method - The HTTP method to use for the request (e.g. "GET", "POST", "PUT", "DELETE").
 * @param overridePath - A boolean value indicating whether or not to include process.env.API_BASE_PATH.
 * @param headerOptions - An optional object containing additional headers to include in the request.
 * @param options - An optional object containing additional options to pass to the `fetch` function like cache, body, revalidate etc. Please see example in the commented code below (# SAMPLE USAGE 1 or # SAMPLE USAGE 2).
 * @param removeHeaderKey - An optional key to remove from the headers object before sending the request.
 * @param isAdminPath - An optional boolean value indicating whether or not the request should point to the admin API path.
 * @param replaceContentType - An optional string to replace the "Content-Type" header with.
 * @returns The response object from the fetch request.
 */
export const genericRequest = async ({
  path,
  overridePath = false,
  method = "GET",
  headerOptions = {},
  options = {},
  removeHeaderKey,
  isAdminPath,
  replaceContentType,
}: GenericRequestProps) => {
  // Build the full path to the endpoint
  let endpointFullPath = null;

  if (overridePath) {
    endpointFullPath = path;
  } else if (isAdminPath) {
    endpointFullPath = `${process.env.API_BASE_PATH_ADMIN}${path}`;
  } else {
    endpointFullPath = `${process.env.API_BASE_PATH}${path}`;
  }

  // Build the options
  const additionalHeaders = await getAdditionalHeaderMetaData();

  const fetchOptions: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // Set default content type for JSON body
      ...headerOptions,
      ...additionalHeaders,
    },
    ...options,
  };

  // If you want to remove a specific header key like "Content-Type"
  if (removeHeaderKey) {
    if (fetchOptions.headers && typeof fetchOptions.headers === "object") {
      delete (fetchOptions.headers as Record<string, string>)[removeHeaderKey];
    }
  }

  if (replaceContentType) {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      "Content-Type": replaceContentType,
    };
  }

  // Call the API
  const response = await fetch(endpointFullPath, fetchOptions);
  return response;
};

// # SAMPLE USAGE 1
// export async function getMenus() {
//   const response = await genericRequest({
//     path: `/menu`,
//     method: "GET",
//     options: {
//       cache: "no-store",
//     },
//   });

//   const data: Menu = await response.json();
//   return data;
// }

// # SAMPLE USAGE 2
// export const inquiryFormInsert = async ({ formData }: InquiryFormSaveProps) => {
//   const response = await genericRequest({
//     path: `/inquiry`,
//     method: "POST",
//     headerOptions: {
//       Accept: "application/json",
//     },
//     options: {
//       body: formData,
//     },
//   });

//   const data: InquiryFormResponseType = await response.json();

//   return data;
// };
