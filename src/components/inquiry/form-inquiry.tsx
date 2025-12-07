"use client";
import {
  FieldGenericInput,
  FieldGenericSelect,
  FieldGenericTextArea,
} from "@/components/feature/form";
import { openModalMessage } from "@/components/feature/modal/modal-message";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  InquiryFormType,
  InquiryTransformType,
  InquiryType,
  submitInquiryForm,
  transformInquiryDataToFormData,
} from "./lib";
import { inquiryFormSchema } from "./lib/form-schema";

interface Props {
  inquiryTypes: InquiryType[];
}

export const FormInquiry = ({ inquiryTypes }: Props) => {
  const searchParams = useSearchParams();
  const type = searchParams?.get("type");
  const subjectIndex = Number(type);
  const [isClicked, setClicked] = useState(false);
  const updatedData: InquiryTransformType[] = inquiryTypes.map(
    ({ id, name }) => ({
      id,
      label: name,
    }),
  );
  const isValidIndex =
    !isNaN(subjectIndex) &&
    subjectIndex >= 0 &&
    subjectIndex < updatedData.length;
  const router = useRouter();
  const form = useForm<z.infer<typeof inquiryFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      subject: isValidIndex ? updatedData[subjectIndex].id : updatedData[0].id,
      body: "",
      email: "",
    },
  });

  function handleClosePopup(): void {
    const pathRedirect = "/";
    form.reset();
    router.replace(pathRedirect);
    router.refresh();
  }

  const onSubmit = async (formData: InquiryFormType) => {
    const successTitle = "送信完了";
    const successMessage =
      "担当者より折り返しご連絡いたしますのでしばらくお待ちください。";
    const failedTitle = "メール送信失敗";
    const failedMessage =
      "メールの送信中にエラーが発生しました。しばらくしてから再試行してください。";

    const transfrormFormData = transformInquiryDataToFormData(formData);

    try {
      setClicked(true);
      const response = await submitInquiryForm(transfrormFormData);

      if (response?.errors) {
        toast({
          title: failedTitle,
          description: failedMessage,
          variant: "destructive",
        });
      }
      if (response.success) {
        openModalMessage({
          title: successTitle,
          message: successMessage,
          handler: handleClosePopup,
        });
      }

      setClicked(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "Error during submitting the email",
        description: errorMessage,
        variant: "destructive",
      });
      setClicked(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGenericInput
            formHook={form}
            formInputName="name"
            labelText="お名前"
            formItemClassName="flex-col lg:flex-row items-baseline"
            formLabelClassName="w-[7.5rem] text-base sm:text-lg"
            placeholder="西宮太郎"
            hasBadge={true}
          />

          <FieldGenericSelect
            formHook={form}
            formInputName="subject"
            labelText="件名"
            dropdownValues={updatedData}
          />

          <FieldGenericTextArea
            formHook={form}
            formInputName="body"
            labelText="内容"
            textAreaClassName="min-h-[11.8125rem]"
            placeholder=""
            hasBadge={true}
          />

          <FieldGenericInput
            formHook={form}
            formInputName="email"
            labelText="メールアドレス"
            formItemClassName="flex-col lg:flex-row items-baseline"
            formLabelClassName="w-[7.5rem]"
            placeholder="nishinomiya_taro@example.com"
            hasBadge={true}
          />

          <div className="text-center">
            <Button
              disabled={isClicked}
              type="submit"
              className="inline-flex text-base md:w-auto"
            >
              送信する
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
