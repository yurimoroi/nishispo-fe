"use server";

import { genericRequest } from "@/lib/generic-action";

import { InquiryResponseType, InquiryTypesResponseType } from "./types";

export const submitInquiryForm = async (formData: FormData) => {
  const path = `/inquiry`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: formData,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: InquiryResponseType = await response.json();
  return data;
};

export const getInquiryType = async () => {
  const response = await genericRequest({
    path: "/inquiry-types",
    method: "GET",
  });

  const data: InquiryTypesResponseType = await response.json();
  return data;
};
