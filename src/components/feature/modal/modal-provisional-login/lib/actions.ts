"use server";

import { cookies } from "next/headers";
import { COOKIE_FIRST_VISIT_KEY, COOKIE_PROVISIONAL_LOGIN_KEY, DEFAULT_PROVISIONAL_DATA } from "./utils";
import { ProvisionalDataType } from "./types";

export const setFirstVisitCookie = async () => {
  const cookieStore = await cookies();
  const firstVisitKeyValue = cookieStore.get(COOKIE_FIRST_VISIT_KEY)?.value;

  if (!firstVisitKeyValue) {
    // maxAge is equivalent to 100 years
    cookieStore.set(COOKIE_FIRST_VISIT_KEY, "true", {
      maxAge: 100 * 365 * 24 * 60 * 60,
      httpOnly: true,
    });
  }
};

export const getFirstVisitCookie = async () => {
  const cookieStore = await cookies();
  const firstVisitKeyValue = cookieStore.get(COOKIE_FIRST_VISIT_KEY)?.value;

  return firstVisitKeyValue === "true";
};

export const setProvisionalLoginData = async (data: string) => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_PROVISIONAL_LOGIN_KEY, data, {
    maxAge: undefined,
    httpOnly: true,
  });
};

export const getProvisionalLoginData = async () => {
  const cookieStore = await cookies();
  const provisionalLoginData = cookieStore.get(
    COOKIE_PROVISIONAL_LOGIN_KEY,
  )?.value;
  if (provisionalLoginData) {
    const data = JSON.parse(provisionalLoginData) as ProvisionalDataType;
    return data;
  }
  return DEFAULT_PROVISIONAL_DATA;
};
