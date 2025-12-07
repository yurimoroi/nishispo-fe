"use client";

import { Form, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { reissuePasswordFormSchema } from "./lib/form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGenericInput } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { sendReissuePasswordRequest } from "./lib/actions";
import { toast } from "@/hooks/use-toast";
import { openModalMessage } from "@/components/feature/modal";
import { LabelWithBadgeTransparent } from "@/components/feature/common";
import { useRouter } from "next/navigation";

export const FormPasswordReissue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrorMessage, setAPIErrorMessage] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof reissuePasswordFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(reissuePasswordFormSchema),
    defaultValues: {
      loginId: "",
      email: "",
    },
  });
  const { watch } = form;
  const className = "font-medium lg:text-base lg:font-bold text-xs block pb-2";
  const onSubmit = async (
    values: z.infer<typeof reissuePasswordFormSchema>,
  ) => {
    try {
      setIsLoading(true);
      const response = await sendReissuePasswordRequest(values);

      if (!response?.success) {
        setAPIErrorMessage("ログインIDまたはメールアドレスが違います");
        console.warn(response?.message);
      } else {
        openModalMessage({
          title: "パスワードの再発行を行いました",
          message:
            "入力したメールアドレスへ再発行用のURLを送付しましたのでご確認ください。",
          handler: () => {
            router.push("/login");
          },
        });
      }
    } catch (error) {
      toast({
        title: "Reissue Password Error",
        description: String(error),
      });
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
        <FieldGenericInput
          formHook={form}
          formInputName="loginId"
          labelText={
            <div>
              <LabelWithBadgeTransparent
                label="ログインID"
                labelProps={{ className: "font-bold text-base lg:text-lg" }}
              />
              {apiErrorMessage && (
                <FormMessage className="mb-3 mt-5 font-normal">
                  {apiErrorMessage}
                </FormMessage>
              )}
            </div>
          }
          formLabelClassName={className}
        />
        <FieldGenericInput
          formHook={form}
          formInputName="email"
          labelText={
            <LabelWithBadgeTransparent
              label="メールアドレス"
              labelProps={{ className: "font-bold text-base lg:text-lg" }}
            />
          }
          formLabelClassName={className}
        />
        <div className="flex justify-center">
          <Button disabled={isLoading}>パスワードを再発行する</Button>
        </div>
      </form>
    </Form>
  );
};
