"use client";

import { FieldGenericTextArea } from "@/components/feature/form";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AdminInquiriesByIdResponseType, sendReplyToInquiry } from "../lib";
import { z } from "zod";
import { formAdminInquiriesSchema } from "../lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  FieldBlock,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
  LabelFieldBlockDetailView,
} from "@/components/feature/common";
import { openModalMessage } from "@/components/feature/modal";

type FormAdminInquiriesEditProps = {
  response?: AdminInquiriesByIdResponseType;
};

export const FormAdminInquiriesEdit = ({
  response,
}: FormAdminInquiriesEditProps) => {
  const router = useRouter();
  const { data: info } = response || {};

  const form = useForm<z.infer<typeof formAdminInquiriesSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formAdminInquiriesSchema),
    defaultValues: {
      replyContent: info?.reply || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  function handleClosePopup(): void {
    router.push("/admin/inquiries");
    router.refresh();
  }

  const onSubmit = async (
    formData: z.infer<typeof formAdminInquiriesSchema>,
  ) => {
    try {
      form.reset(form.getValues());
      setIsLoading(true);
      const response = await sendReplyToInquiry(
        info?.id || "",
        formData.replyContent,
      );
      if (response.success) {
        openModalMessage({
          title: "送信が完了しました",
          message: "ユーザーへのメールの送信が完了しました",
          handler: handleClosePopup,
        });
      } else {
        toast({
          title: "Error",
          description: response.message
            ? response.message
            : "Error replying to inquiry.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error replying to inquiry.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Name */}
      <LabelFieldBlockDetailView
        label="お名前"
        child={
          <FieldBlock className="px-3 text-base lg:p-0">
            <div className="flex items-center gap-5 p-0">
              <span>{info?.name}</span>
            </div>
          </FieldBlock>
        }
      />
      {/* Email */}
      <LabelFieldBlockDetailView label="メールアドレス" value={info?.email} />
      {/* Title */}
      <LabelFieldBlockDetailView
        label="件名"
        value={info?.inquiry_type?.type}
      />

      {/* Title */}
      <LabelFieldBlockDetailView label="内容" value={info?.body} />
      {/* Created At */}
      <LabelFieldBlockDetailView label="送信日時" value={info?.created_at} />

      {/* Created At */}
      <LabelFieldBlockDetailView
        label="返信"
        value={info?.reply_flg ? "返信済み" : "未返信"}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[1.25rem]">
          {/* Reply Content */}
          <LabelFieldBlock>
            <LabelBlock>
              返信内容 <LabelBadge />
            </LabelBlock>
            <FieldBlock>
              <FieldGenericTextArea
                formHook={form}
                formInputName="replyContent"
                labelText=""
                textAreaClassName="h-[13.8125rem]"
              />
            </FieldBlock>
          </LabelFieldBlock>
          <div className="inline-flex w-full flex-row justify-center gap-[.75rem] px-[2.6875rem] pb-10 pt-10 lg:flex lg:flex-row lg:gap-5">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              className="w-full lg:w-auto"
            >
              戻る
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full lg:w-auto"
            >
              送信する
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
