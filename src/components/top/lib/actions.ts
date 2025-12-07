"use server";

import { genericRequest } from "@/lib/generic-action";
import { TopNewsResponseType } from "./types";

export async function getTopNewsContent() {
  const path = `/articles`;
  const response = await genericRequest({
    path: path,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: TopNewsResponseType = await response.json();

  return data;
}
