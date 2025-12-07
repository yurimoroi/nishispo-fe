"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  OrganizationResponseType,
  RegistrationProfileResponseType,
  RegistrationResponseType,
} from "./types";

export const getOrganizationList = async () => {
  const response = await genericRequest({
    method: "GET",
    path: "/organization",
    options: {
      cache: "no-store",
    },
  });

  const data: OrganizationResponseType = await response.json();

  return data;
};

export const submitRegistration = async (formDataToSubmit: FormData) => {
  const response = await genericRequest({
    method: "POST",
    path: "/auth/register",
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: RegistrationResponseType = await response.json();

  return data;
};

export const submitProfileImage = async (formDataToSubmit: FormData) => {
  const response = await genericRequest({
    method: "POST",
    path: "/media/upload",
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  const data: RegistrationProfileResponseType = await response.json();

  return data;
};

export const updateProfile = async (formDataToSubmit: FormData) => {
  const response = await genericRequest({
    path: "/profile/update",
    method: "POST",
    options: {
      body: formDataToSubmit,
    },
    removeHeaderKey: "Content-Type",
  });

  // we reused saveArticle response, update if needed
  const data: RegistrationResponseType = await response.json();

  return data;
};


