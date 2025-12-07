"use server";

import { cookies } from "next/headers";
import {
  CheckSocialExistsResponseType,
  COOKIE_SOCIAL_ACTION,
  COOKIE_SOCIAL_PROVIDER,
  COOKIE_USER_METADATA,
  LinkSocialResponseType,
  LoginSocialResponseType,
  SocialAction,
  SocialProvider,
  UnlinkSocialResponseType,
} from "./types";
import { genericRequest } from "@/lib/generic-action";

type SetSocialLoginCookies = {
  action: SocialAction;
  provider: SocialProvider;
};

export const setSocialLoginCookies = async ({
  action,
  provider,
}: SetSocialLoginCookies) => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_SOCIAL_PROVIDER, provider, {
    maxAge: undefined,
    httpOnly: true,
  });
  cookieStore.set(COOKIE_SOCIAL_ACTION, action, {
    maxAge: undefined,
    httpOnly: true,
  });
};

export const getSocialLoginCookies = async () => {
  const cookieStore = await cookies();
  const provider = cookieStore.get(COOKIE_SOCIAL_PROVIDER)?.value;
  const action = cookieStore.get(COOKIE_SOCIAL_ACTION)?.value;
  return { provider, action };
};

export const clearSocialLoginCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_SOCIAL_PROVIDER);
  cookieStore.delete(COOKIE_SOCIAL_ACTION);
};

export const storeUserMetadataInCookie = async (data: any) => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_USER_METADATA, JSON.stringify(data), {
    httpOnly: true,
    maxAge: undefined,
  });
};

export const getUserMetadataFromCookie = async () => {
  const cookieStore = await cookies();
  const data = cookieStore.get(COOKIE_USER_METADATA)?.value;
  return data ? JSON.parse(data) : null;
};

export const clearUserMetadataFromCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_USER_METADATA);
};

// #region LINKING

// Backend knows who is currently logged in
export const linkSocialAccount = async (
  provider: SocialProvider,
  providerId: string,
) => {
  const path = `/user/social`;

  const response = await genericRequest({
    path: path,
    method: "PUT",
    options: {
      body: JSON.stringify({ provider: provider, provider_id: providerId }),
    },
  });

  const data: LinkSocialResponseType = await response.json();

  return data;
};

// Backend knows who is currently logged in
export const unlinkSocialAccount = async (provider: SocialProvider) => {
  const path = `/user/social/unlink`;

  const response = await genericRequest({
    path: path,
    method: "PUT",
    options: {
      body: JSON.stringify({ provider: provider }),
    },
  });

  const data: UnlinkSocialResponseType = await response.json();

  return data;
};

export const loginSocial = async (
  provider: SocialProvider,
  providerId: string,
) => {
  const path = `/auth/login/social`;

  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify({ provider: provider, provider_id: providerId }),
    },
  });

  const data: LoginSocialResponseType = await response.json();

  return data;
};

export const checkIfAvailableForLinking = async (
  provider: SocialProvider,
  providerId: string,
) => {
  const path = `/social/register?provider=${provider}&provider_id=${providerId}`;

  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: CheckSocialExistsResponseType = await response.json();

  return data;
};
// #endregion
