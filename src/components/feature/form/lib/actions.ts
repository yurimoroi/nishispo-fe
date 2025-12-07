"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  CheckEmailExistResponseType,
  CheckUserNameExistResponseType,
} from "./types";

export const checkIfUsernameExists = async (username: string) => {
  const response = await genericRequest({
    method: "POST",
    path: "/auth/check/login-id",
    options: {
      cache: "no-store",
      body: JSON.stringify({ login_id: username }),
    },
  });

  const data: CheckUserNameExistResponseType = await response.json();

  return data;
};
export const checkIfEmailExists = async (email: string) => {
  const response = await genericRequest({
    method: "POST",
    path: "/validate",
    options: {
      cache: "no-store",
      body: JSON.stringify({
        field: "email",
        value: email,
      }),
    },
  });

  const data: CheckEmailExistResponseType = await response.json();

  return data;
};
