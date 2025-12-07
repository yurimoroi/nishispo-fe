"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { changePasswordFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormMessage } from "@/components/ui/form";
import { FieldGenericInput } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { submitChangePassword } from "./lib/actions";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { LabelWithBadgeTransparent } from "@components/feature/common";
import { openModalMessage } from "@components/feature/modal";

export const FormChangePassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrorMessage, setAPIErrorMessage] = useState("");
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { watch } = form;
  const className = "font-medium lg:text-base lg:font-bold text-xs block pb-2";

  const onSubmit = async (values: z.infer<typeof changePasswordFormSchema>) => {
    setIsLoading(true);
    try {
      const response = await submitChangePassword(values);
      const { success = null, message = null, errors } = response;

      if (success) {
        openModalMessage({
          title: "パスワードを変更しました",
          message: "お客様のパスワードは正常に変更されました",
          handler: () => {
            router.push("/mypage");
          },
        });
      }

      if (!success || errors) {
        setAPIErrorMessage("パスワードが違います");
        console.warn(response?.message || errors);
      }
    } catch (error) {
      toast({
        title: "Change Password Error",
        description: String(error),
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset API error message when form changes
  useEffect(() => {
    const { unsubscribe } = watch(() => {
      setAPIErrorMessage("");
    });
    return () => unsubscribe();
  }, [watch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <FieldGenericInput
            formHook={form}
            formInputName="currentPassword"
            labelText={
              <LabelWithBadgeTransparent
                label="変更前のパスワード"
                labelProps={{ className: "font-bold text-base lg:text-lg" }}
              />
            }
            isPasswordField={true}
            formLabelClassName={className}
          />
          {apiErrorMessage && (
            <FormMessage className="mt-2">{apiErrorMessage}</FormMessage>
          )}
        </div>
        <FieldGenericInput
          formHook={form}
          formInputName="password"
          labelText={
            <LabelWithBadgeTransparent
              label="変更したいパスワード"
              labelProps={{ className: "font-bold text-base lg:text-lg" }}
            />
          }
          isPasswordField={true}
          formLabelClassName={className}
        />
        <FieldGenericInput
          formHook={form}
          formInputName="confirmPassword"
          labelText={
            <LabelWithBadgeTransparent
              label="変更したいパスワード（再入力）"
              labelProps={{ className: "font-bold text-base lg:text-lg" }}
            />
          }
          isPasswordField={true}
          formLabelClassName={className}
        />
        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading}>
            変更する
          </Button>
        </div>
      </form>
    </Form>
  );
};
