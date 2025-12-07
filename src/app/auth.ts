import NextAuth, { DefaultSession, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { genericRequest } from "@/lib/generic-action";
import Facebook from "next-auth/providers/facebook";
import Line from "next-auth/providers/line";
import Twitter from "next-auth/providers/twitter";
import {
  checkIfAvailableForLinking,
  clearSocialLoginCookies,
  clearUserMetadataFromCookie,
  getSocialLoginCookies,
  getUserMetadataFromCookie,
  linkSocialAccount,
  loginSocial,
  storeUserMetadataInCookie,
  unlinkSocialAccount,
} from "@/components/social/lib/actions";
import { SocialAction, SocialProvider } from "@/components/social/lib/types";
import { LoginDataType, LoginResponseType } from "@/components/login/lib/types";


export class LoginAPIError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.name = message;
  }
}

declare module "next-auth" {
  export interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string | null;
    errorMessage?: string | null;
    company?: string | null;
    isPR?: boolean | null;
    authorName?: string | null;
    isSecretariat?: boolean | null;
    isContributor?: boolean | null;
    canContributeArticle?: boolean | null;
    contributorStatus?: number;
  }
  interface Session {
    user: {
      accessToken: string | undefined | null;
      errorMessage: string | undefined | null;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
        keepMeLoggedIn: { type: "boolean" },
        isAdmin: { type: "boolean" },
      },
      authorize: async (credentials): Promise<User | null> => {
        const payload = {
          login_id: credentials.username,
          password: credentials.password,
          remember_me: credentials.keepMeLoggedIn === "true",
        };

        const isAdmin = credentials?.isAdmin === "true";

        // Call Actual API to login
        const response = await genericRequest({
          method: "POST",
          path: isAdmin ? "/login" : "/auth/login",
          isAdminPath: isAdmin,
          options: {
            cache: "no-store",
            body: JSON.stringify(payload),
          },
        });

        const data: LoginResponseType = await response.json();

        // Handle invalid credentials and pass the error message to the UI
        if (data.success !== true) {
          throw new LoginAPIError(data.message);
        }

        const {
          data: { token_type, access_token, user: userDetail },
        } = data;

        const {
          id,
          full_name,
          email,
          company,
          contributor_name,
          advertiser_flg,
          permissions: {
            is_secretariat,
            is_advertiser,
            can_contribute_article,
          },
        } = userDetail;
        const { name: companyName } = company;

        // Finally return the user data
        return {
          id,
          name: full_name,
          email: email,
          company: companyName,
          accessToken: access_token,
          isPR: advertiser_flg === 1,
          authorName: contributor_name,
          isSecretariat: is_secretariat,
          isContributor: is_advertiser,
          canContributeArticle: can_contribute_article,
          contributorStatus: userDetail.contributor.status,
        };
      },
    }),
    Facebook,
    Line({
      clientId: process.env.AUTH_LINE_ID,
      clientSecret: process.env.AUTH_LINE_SECRET,
      checks: ["state"],
    }),
    Twitter,
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.company = user.company;
        token.name = user.name;
        token.email = user.email;
        token.errorMessage = user.errorMessage;
        token.isPR = user.isPR;
        token.authorName = user.authorName;
        token.isSecretariat = user.isSecretariat;
        token.isContributor = user.isContributor;
        token.canContributeArticle = user.canContributeArticle;
        token.contributorStatus = user.contributorStatus;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      session.user.company = token.company as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.isPR = token.isPR as boolean;
      session.user.authorName = token.authorName as string;
      session.user.isSecretariat = token.isSecretariat as boolean;
      session.user.isContributor = token.isContributor as boolean;
      session.user.canContributeArticle = token.canContributeArticle as boolean;
      session.user.contributorStatus = token.contributorStatus as number;

      // If there is cookie then override it- this cookie is populated on signIn with Social
      const userMetadata: LoginDataType = await getUserMetadataFromCookie();

      if (userMetadata) {
        const { user: userDetail, access_token } = userMetadata;
        session.user.id = userDetail.id;
        session.user.accessToken = access_token;
        session.user.company = userDetail.company.name;
        session.user.name = userDetail.full_name;
        session.user.email = userDetail.email;
        session.user.isPR = userDetail.advertiser_flg === 1;
        session.user.authorName = userDetail.contributor_name;
        session.user.isSecretariat = userDetail.permissions.is_secretariat;
        session.user.isContributor = userDetail.permissions.is_advertiser;
        session.user.canContributeArticle =
          userDetail.permissions.can_contribute_article;
        session.user.contributorStatus = userDetail.contributor.status;

        // Note: Keeping code as reference, clear cookie for metadata
        // clearUserMetadataFromCookie();
      }

      return { ...session };
    },
    async signIn({ user, account, profile }) {
      if (user.errorMessage || !account) {
        return false;
      }

      const { providerAccountId } = account;

      const params = await getSocialLoginCookies();

      // Linking
      if (params.action === SocialAction.Link && providerAccountId) {
        try {
          // Link Social Account
          const linkAccountResponse = await linkSocialAccount(
            params!.provider as SocialProvider,
            providerAccountId,
          );
          // Check social login and get user data
          const linkAccountLoginResponse = await loginSocial(
            params!.provider as SocialProvider,
            providerAccountId,
          );
          // Store user data so we can use it later
          await storeUserMetadataInCookie(linkAccountLoginResponse.data);

          await clearSocialLoginCookies();

          // Error Handling
          if (!linkAccountResponse.success) {
            console.error(
              "Error on linking social account",
              linkAccountResponse.message,
            );
          } else {
            console.info(
              "Success on linking social account",
              linkAccountResponse.message,
            );
          }

          // If we return false here, the sign in flow will not proceed and social login redirect will be 4040
        } catch (error) {
          console.error("Error on linking social account", error);
        }
      }

      // Login using Social Account
      if (params.action === SocialAction.Login) {
        // Call our API
        const linkAccountLoginResponse = await loginSocial(
          params!.provider as SocialProvider,
          providerAccountId,
        );

        if (!linkAccountLoginResponse.success) {
          return "/login?accountLink=false";
        }

        // Store user data so we can use it later
        await storeUserMetadataInCookie(linkAccountLoginResponse.data);
        // clear social login identifier
        await clearSocialLoginCookies();
      }

      // Registering
      if (params.action === SocialAction.Register && providerAccountId) {
        // Call our API

        try {
          const response = await checkIfAvailableForLinking(
            params!.provider as SocialProvider,
            providerAccountId,
          );

          // If available for linking, redirect to register page
          if (response.success === true) {
            return `/register/new?provider=${params!.provider}&id=${providerAccountId}`;
          } else {
            // If not available for linking, sign and redirect to top page
            return true;
          }
        } catch (error) {
          console.error("Error on checking social account", error);
        }
      }

      return true;
    },
  },
  session: {
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 years in seconds
  },
});
