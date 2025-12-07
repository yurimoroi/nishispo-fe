import { LoginDataType } from "@/components/login/lib/types";

export const COOKIE_SOCIAL_PROVIDER = "miyaspo.social-provider";
export const COOKIE_SOCIAL_ACTION = "miyaspo.social-action";

export const COOKIE_USER_METADATA = "miyaspo.user-metadata";

export enum SocialAction {
  Login = "login",
  Link = "link",
  Unlink = "unlink",
  Register = "register",
}

export enum SocialProvider {
  Facebook = "facebook",
  TwitterX = "twitter",
  Line = "line",
  Instagram = "instagram",
}

export type LinkSocialResponseType = {
  success: boolean;
  message: string;
};

export type UnlinkSocialResponseType = LinkSocialResponseType;

export type LoginSocialResponseType = LinkSocialResponseType & {
  data: LoginDataType;
};

export type CheckSocialExistsResponseType = LinkSocialResponseType & {
  data: string;
};
