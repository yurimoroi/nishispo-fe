"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contributorFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FieldGenericInput } from "@feature/form";
import { Button } from "@/components/ui/button";
import { closeModalContributor } from "./lib";
import { TwoColContainer, TwoColContainerItem } from "../../layout";
import { sendContributorApplication } from "./lib/actions";
import { toast } from "@/hooks/use-toast";
import {
  LabelWithBadgeTransparent,
} from "../../common";
import { useRouter } from "next/navigation";

export const FormModalContributor = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof contributorFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(contributorFormSchema),
    defaultValues: {
      authorName: "",
      rakutenID: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contributorFormSchema>) => {
    try {
      setIsLoading(true);

      const response = await sendContributorApplication(values);

      if (!response?.success) {
        toast({
          title: "Contributor Application Warning",
          description: response?.message,
        });
      } else {
        closeModalContributor();
      }
    } catch (error) {
      toast({
        title: "Contributor Application Error",
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
          formInputName="authorName"
          labelText={<LabelWithBadgeTransparent label="記事投稿者名" />}
          isModal={true}
          formItemClassName="flex-col gap-0 lg:flex-row items-baseline"
          formLabelClassName="w-[10.625rem]"
        />
        <TwoColContainer className="gap-0 lg:!mt-2">
          <TwoColContainerItem className="w-[10.625rem] shrink-0"></TwoColContainerItem>
          <TwoColContainerItem>
            <span className="text-sm text-dark-300">
              記事投稿者名は、書いた記事が投稿される時の表示名となります。
            </span>
          </TwoColContainerItem>
        </TwoColContainer>
        <FieldGenericInput
          formHook={form}
          formInputName="rakutenID"
          labelText={"楽天ID"}
          isModal={true}
          formItemClassName="flex-col lg:flex-row gap-0 items-baseline"
          formLabelClassName="w-[10.625rem]"
        />
        <TwoColContainer className="!mt-2 gap-0">
          <TwoColContainerItem className="w-[10.625rem] shrink-0"></TwoColContainerItem>
          <TwoColContainerItem>
            <span className="text-sm text-dark-300">
              楽天 ID
              は、執筆いただいた記事に対する報酬を楽天ポイントで受け取るために必要となります。
            </span>
          </TwoColContainerItem>
        </TwoColContainer>
        <div className="flex justify-center gap-5">
          <Button disabled={isLoading}>申請</Button>
          <Button
            disabled={isLoading}
            type="button"
            variant="secondary"
            onClick={closeModalContributor}
          >
            閉じる
          </Button>
        </div>
      </form>
    </Form>
  );
};
