"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { usernameSelectFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@components/ui/form";
import { FieldGenericInput } from "@components/feature/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { resetRegisterFormValues } from "./lib/store";
import { LabelWithBadgeTransparent } from "../feature/common";

export const FormMenu = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof usernameSelectFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(usernameSelectFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof usernameSelectFormSchema>) => {
    router.push("/register/new?username=" + values.username);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGenericInput
          formHook={form}
          formInputName="username"
          labelText={
            <LabelWithBadgeTransparent
              label="ご希望のログインID"
              labelProps={{
                className: "font-medium",
              }}
            />
          }
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            onClick={() => {
              resetRegisterFormValues();
            }}
          >
            ログインIDで登録する
          </Button>
        </div>
      </form>
    </Form>
  );
};
