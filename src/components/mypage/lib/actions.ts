"use server";

import { genericRequest } from "@/lib/generic-action";
import {
  AffiliateWithdrawApiResponseType,
  UserDetailApiResponseType,
} from "./types";

export const getUserDetail = async () => {
  const response = await genericRequest({
    path: "/profile",
    method: "GET",
    headerOptions: {
      Accept: "application/json",
    },
    options: {
      cache: "no-store",
    },
  });

  const data: UserDetailApiResponseType = await response.json();

  return data;
};

export const affiliateWithdrawalRequest = async (affiliateId: string) => {
  const path = `/organizations/${affiliateId}/withdrawal`;

  const response = await genericRequest({
    path,
    method: "POST",
    options: {
      cache: "no-store",
    },
  });

  const data: AffiliateWithdrawApiResponseType = await response.json();

  return data;
};