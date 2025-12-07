import { ReadonlyURLSearchParams } from "next/navigation";

export function getFinalParamValue(
  searchParamValue: string | null,
  queryParamFieldValue: string | null | undefined,
) {
  if (queryParamFieldValue === null) {
    //null is set from the form which empty an empty field
    return null;
  }

  if (
    queryParamFieldValue !== undefined &&
    queryParamFieldValue.trim().length !== 0
  ) {
    return queryParamFieldValue;
  }
  //if queryParamFieldValue is undefined use current query string
  return searchParamValue;
}

/**
 * Sets the query parameter value.
 *
 * @param value - The value to set for the query parameter.
 * @returns The value if it is not empty; otherwise, returns null.
 */ export const setQueryParamValue = (value: string) => {
  if (!value) return null;

  return value;
};

/**
 * Retrieves the value of a specified query parameter from the given URL search parameters.
 *
 * @param searchParams - The URL search parameters to search within.
 * @param targetQueryKey - The key of the query parameter to retrieve the value for.
 * @returns The value of the specified query parameter, or an empty string if the parameter is not found.
 */
export const getTargetQueryKeyValue = (
  searchParams: ReadonlyURLSearchParams,
  targetQueryKey: string,
) => {
  return searchParams.get(targetQueryKey) || "";
};
