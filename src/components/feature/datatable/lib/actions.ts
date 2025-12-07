"use server";

import { genericRequest } from "@/lib/generic-action";
import { DeleteGenericItemApiResponseType } from "@/lib/types";

export const genericDeleteById = async (id: string, endpoint: string) => {
  const path = `/${endpoint}/${id}`;
  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "DELETE",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: DeleteGenericItemApiResponseType = await response.json();
  return data;
};
