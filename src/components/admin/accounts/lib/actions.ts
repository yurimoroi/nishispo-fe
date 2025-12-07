"use server";

import { genericRequest } from "@/lib/generic-action";
import { AccountsResponseType } from "./types";

export const getAccounts = async (
  searchTerm: string = "",
  page: string = "",
  users: string[] = [],
) => {
  let url = searchTerm
    ? `/users?filter[search]=${encodeURIComponent(searchTerm)}&paginate=1`
    : `/users?paginate=1`;

  if (page) {
    url += `&${page}`;
  }
  if (users && users.length > 0) {
    const prioritizeQuery = users
      .map((user) => `prioritize[]=${user}`)
      .join("&");
    url += `&${prioritizeQuery}`;
  }

  url += `&perPage=10`;

  const response = await genericRequest({
    path: url,
    method: "GET",
    options: {
      cache: "no-store",
    },
    isAdminPath: true,
  });

  const data: AccountsResponseType = await response.json();
  return data;
};
