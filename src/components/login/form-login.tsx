"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { memberLoginFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormMessage } from "../ui/form";
import {
  FieldGenericInput,
  FieldGenericCheckbox,
  JP_ERROR_MESSAGE_ALT,
} from "../feature/form";
import { Button } from "../ui/button";
import {
  handleLogin,
  updateCookieKeepLoggedIn,
  updateKeepLoggedInCookieFlag,
} from "./lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePreviousURLStore } from "../feature/log-path/lib/store";
import { getSession, useSession } from "next-auth/react";
import { LabelWithBadgeTransparent } from "../feature/common";
import { useLoginForm } from "./lib";

export const FormLogin = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof memberLoginFormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(memberLoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      keepMeLoggedIn: false,
    },
  });

  // Extract some logic
  const { invalidCredentialsMessage, setInvalidCredentialsMessage } =
    useLoginForm({ form });

  const onSubmit = async (
    values: z.infer<typeof memberLoginFormSchema> & {
      isAdmin?: boolean;
    },
  ) => {
    setIsLoading(true);

    // Set Remember Me / Keep Me Logged In flag first
    updateKeepLoggedInCookieFlag(values.keepMeLoggedIn);

    // Set is Admin indicator
    values.isAdmin = isAdmin;

    // Call Auth
    const response = await handleLogin(values);

    setIsLoading(false);

    // Manipulate the cookie, added delay to make sure manipulation is done
    setTimeout(() => {
      updateCookieKeepLoggedIn();
      // Reset flag to false
      updateKeepLoggedInCookieFlag(false);
    }, 2000);

    // Handle the Auth Response
    if (response.success === true) {
      // Redirect to previous page before login else redirect to My Page
      const previousURL = usePreviousURLStore.getState().previousURLs[0];

      const redirectPath = isAdmin
        ? "/admin"
        : previousURL.includes("login")
          ? "/mypage"
          : previousURL;

      router.push(redirectPath);

      // Update auth session
      await getSession();
      router.refresh();
    }

    if (response.success === false) {
      setInvalidCredentialsMessage(JP_ERROR_MESSAGE_ALT.LOGIN_INVALID);
    }
  };

  // Handle scenario where user is already logged in, but accessed login page then redirect them accordingly
  useEffect(() => {
    if (session.data) {
      const redirectPath = isAdmin ? "/admin" : "/mypage";
      router.push(redirectPath);
    }
  }, [session.data, isAdmin, router]);

  return (
    <Form {...form}>
      {invalidCredentialsMessage && (
        <FormMessage className="mb-2">{invalidCredentialsMessage}</FormMessage>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGenericInput
          formHook={form}
          formInputName="username"
          labelText={
            <LabelWithBadgeTransparent
              label="ログインID"
              labelProps={{
                className: "font-medium",
              }}
            />
          }
        />
        <FieldGenericInput
          formHook={form}
          formInputName="password"
          isPasswordField={true}
          labelText={
            <LabelWithBadgeTransparent
              label="パスワード"
              labelProps={{
                className: "font-medium",
              }}
            />
          }
        />

        <div className="flex lg:justify-center">
          <FieldGenericCheckbox
            formHook={form}
            formInputName="keepMeLoggedIn"
            labelText="ログイン状態を保持する"
            labelClassName="text-base lg:text-lg"
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading}>
            ログイン
          </Button>
        </div>
      </form>
    </Form>
  );
};
