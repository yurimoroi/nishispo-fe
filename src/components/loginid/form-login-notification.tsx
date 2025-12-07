"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginNotificationFormSchema } from "./lib/form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGenericInput } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { sendLoginId } from "./lib/actions";
import { toast } from "@/hooks/use-toast";
import { openModalMessage } from "../feature/modal";
import { MODAL_MESSAGE } from "@/lib/message-map";
import { LabelWithBadgeTransparent } from "../feature/common";

export const FormLoginNotification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginNotificationFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(loginNotificationFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (
    values: z.infer<typeof loginNotificationFormSchema>,
  ) => {
    try {
      setIsLoading(true);
      const response = await sendLoginId(values);

      if (!response?.success) {
        toast({
          title: "Send LoginId Warning",
          description: response?.message,
        });
      } else {
        openModalMessage({
          title: MODAL_MESSAGE.LOGIN_ID_REQUEST_TITLE,
          message: MODAL_MESSAGE.LOGIN_ID_REQUEST_CONTENT,
        });
      }
    } catch (error) {
      toast({
        title: "Send LoginId Error",
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
          formInputName="email"
          labelText={
            <LabelWithBadgeTransparent
              label="メールアドレス"
              labelProps={{ className: "font-bold text-base lg:text-lg" }}
            />
          }
        />
        <div className="flex justify-center">
          <Button disabled={isLoading}>ログインIDを通知する</Button>
        </div>
      </form>
    </Form>
  );
};
