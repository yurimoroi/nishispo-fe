"use client";

import { resetPasswordFormSchema } from "./lib/form-schema";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGenericInput } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { sendResetPasswordRequest } from "./lib/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { LabelWithBadgeTransparent } from "@/components/feature/common";

export const FormResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const className = "font-medium lg:text-base lg:font-bold text-xs block pb-2";

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    try {
      setIsLoading(true);

      const response = await sendResetPasswordRequest({
        ...values,
        email: searchParams.get("email") || "",
        token: searchParams.get("token") || "",
      });

      if (!response?.success) {
        toast({
          title: "Reset Password Warning",
          description: response?.message,
        });
      } else {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Reset Password Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGenericInput
          formHook={form}
          formInputName="password"
          labelText={
            <LabelWithBadgeTransparent
              label="再設定したいパスワード"
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
              label="再設定したいパスワード（再入力）"
              labelProps={{ className: "font-bold text-base lg:text-lg" }}
            />
          }
          isPasswordField={true}
          formLabelClassName={className}
        />
        <div className="flex justify-center">
          <Button disabled={isLoading}>再設定する</Button>
        </div>
      </form>
    </Form>
  );
};
