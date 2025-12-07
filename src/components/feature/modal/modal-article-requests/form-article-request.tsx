import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { articleRequestFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FieldGenericSelect, FieldGenericTextArea } from "@feature/form";
import { Button } from "@/components/ui/button";
import { articleRequestTypeValues } from "@/lib";
import {
  closeModalArticleRequest,
  useModalArticleRequestStore,
} from "./lib/store";
import { TwoColContainer, TwoColContainerItem } from "@feature/layout";
import { transformDetailToFormData } from "../modal-article-preview/lib/utils";
import { useArticlePreviewStore } from "@feature/article-preview";
import { toast } from "@/hooks/use-toast";
import {
  sendDeleteArticleRequest,
  sendEditArticleRequest,
} from "./lib/actions";
import { ModalArticleRequestType } from "./lib";
import { openModalMessage } from "../modal-message";
import { usePathname, useRouter } from "next/navigation";
import { MODAL_MESSAGE } from "@/lib/message-map";
import { LabelWithBadgeTransparent } from "../../common";

type FormArticleRequestProps = {
  isModal: boolean;
};
export const FormArticleRequest = ({ isModal }: FormArticleRequestProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const articleData = useArticlePreviewStore.getState() || {};

  const router = useRouter();
  const form = useForm<z.infer<typeof articleRequestFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(articleRequestFormSchema),
    defaultValues: {
      requestType: useModalArticleRequestStore.getState().initialRequestType,
      reason: "",
    },
  });

  const pathname = usePathname();
  const isAdminPath = pathname.includes("admin");

  const onSubmit = async (values: z.infer<typeof articleRequestFormSchema>) => {
    const formDataToSubmit = await transformDetailToFormData(articleData);
    const finalPublishEndDate =
    articleData?.publishEnd === "-" ? "" : articleData?.publishEnd || "";
    formDataToSubmit.append("publish_ended_at", finalPublishEndDate);
    formDataToSubmit.append("request_type", values.requestType);
    formDataToSubmit.append("comment", values.reason);

    setIsLoading(true);

    try {
      let response;

      if (values.requestType === ModalArticleRequestType.Edit) {
        response = await sendEditArticleRequest(formDataToSubmit, articleData.id);
      } else {
        const formDataForDelete = new FormData();
        formDataForDelete.append("comment", values.reason);
        response = await sendDeleteArticleRequest(formDataForDelete, articleData.id);
      }

      if (!response?.success) {
        toast({
          title: "Article Request Warning",
          description: response?.message,
        });
      } else {
        closeModalArticleRequest();

        openModalMessage({
          title: MODAL_MESSAGE.ARTICLE_REQUEST_TITLE,
          message: MODAL_MESSAGE.ARTICLE_REQUEST_CONTENT,
          handler: () => {
            if (isAdminPath) {
              router.push("/admin/articles");
              router.refresh();
              return;
            }

            router.push("/contributor");
            router.refresh();
          },
        });
      }
    } catch (error) {
      toast({
        title: "Article Request Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <TwoColContainer className="gap-2.5">
          <TwoColContainerItem className="shrink-0 text-xs lg:w-[7.5rem]">
            記事タイトル
          </TwoColContainerItem>
          <TwoColContainerItem className="text-xs">
            {articleData?.title}
          </TwoColContainerItem>
        </TwoColContainer>
        <FieldGenericSelect
          formHook={form}
          formInputName="requestType"
          labelText="依頼種別"
          dropdownValues={articleRequestTypeValues}
          formItemClassName="flex flex-col lg:flex-row gap-2.5 lg:items-center"
          formLabelClassName="lg:w-[7.5rem]"
        />

        <FieldGenericTextArea
          formHook={form}
          formInputName="reason"
          labelText={<LabelWithBadgeTransparent label="変更事由" />}
          textAreaClassName="h-[4.375rem]"
          formItemClassName="flex flex-col lg:flex-row gap-2.5 lg:items-center"
          formLabelClassName="lg:w-[7.5rem]"
          isModal={isModal}
        />

        <div className="flex justify-center gap-5">
          <Button disabled={isLoading}>変更依頼を送信する</Button>
          <Button
            disabled={isLoading}
            type="button"
            variant="secondary"
            onClick={closeModalArticleRequest}
          >
            閉じる
          </Button>
        </div>
      </form>
    </Form>
  );
};
