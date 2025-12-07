"use server";
import { LoginAPIError, signIn, signOut } from "@/app/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
export const handleLogin = async (values: any) => {
  try {
    const response = await signIn("credentials", {
      ...values,
      redirectTo: "/",
      redirect: false,
    });

    return {
      success: true,
      response,
    };
  } catch (error) {
    //see https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
    if (isRedirectError(error)) {
      throw error;
    }
    // Handle Login related error throw
    if (error instanceof LoginAPIError) {
      return {
        success: false,
        message: error.name,
      };
    }
    // Default error message
    return {
      success: false,
      message: "Something went wrong while checking your credentials.",
    };
  }
};

export const handleLogout = async () => {
  await signOut({ redirectTo: "/", redirect: true });
};

export const updateKeepLoggedInCookieFlag = (flag: boolean = false) => {
  const cookieStore = cookies();

  cookieStore.set("isKeepMeLoggedIn", flag.toString());
};

export const updateCookieKeepLoggedIn = () => {
  const cookieStore = cookies();

  const currentValue = cookieStore.get("authjs.session-token")?.value || "";
  const isKeepMeLoggedInValue =
    cookieStore.get("isKeepMeLoggedIn")?.value || "";

  if (isKeepMeLoggedInValue !== "true") {
    cookieStore.set("authjs.session-token", currentValue, {
      maxAge: undefined,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return true;
};
