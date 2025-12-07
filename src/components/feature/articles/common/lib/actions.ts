"use server";

import { genericRequest } from "@/lib/generic-action";
import { MediaResponseType, TagsResponseType } from "./types";

export async function getTags() {
  const path = `/tag?limit=15`;
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

  const data: TagsResponseType = await response.json();

  return data;
}

export async function getMedia() {
  const path = `/company/alignment-media`;
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

  const data: MediaResponseType = await response.json();

  return data;
}
