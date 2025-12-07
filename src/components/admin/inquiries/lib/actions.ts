"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AdminInquiriesByIdResponseType,
  AdminInquiriesDataResponseType,
  SendReplyToInquiryResponseType,
} from "./types";

type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const getAdminInquiriesData = async ({ searchParams }: SearchParams) => {
  searchParams.page = searchParams.page ? searchParams.page.toString() : "1";
  searchParams.perPage = searchParams.perPage
    ? searchParams.perPage.toString()
    : "10";

  const queryString = new URLSearchParams(
    searchParams as Record<string, string>,
  ).toString();

  const path = `/inquiries`;
  const response = await genericRequest({
    path: `${path}?${queryString}`,
    isAdminPath: true,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: AdminInquiriesDataResponseType = await response.json();
  return data;
};

export const getAdminInquiriesById = async (id: string) => {
  const path = `/inquiries/${id}`;
  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: AdminInquiriesByIdResponseType = await response.json();
  return data;
};

export const sendReplyToInquiry = async (id: string, replyContent: string) => {
  const path = `/inquiries/${id}`;
  const response = await genericRequest({
    path: path,
    isAdminPath: true,
    method: "PUT",
    headerOptions: {
      Accept: "application/json",
    },

    options: {
      cache: "no-store",
      body: JSON.stringify({ reply: replyContent }),
    },
  });

  const data: SendReplyToInquiryResponseType = await response.json();
  return data;
};
