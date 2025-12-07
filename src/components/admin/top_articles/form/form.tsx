"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  AdminTopArticlesByIdResponseType,
  createOrUpdateAdminTopArticle,
  formAdminTopArticlesSchema,
} from "../lib";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
  LabelFieldBlockDetailView,
} from "@/components/feature/common/label-field-block";
import { CustomErrorMessage } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { displayOrderValues } from "@/lib/dropdown-values";
import { FieldGenericSelect } from "@/components/feature/form/field-generic-select";
import { z } from "zod";
import IconTilde from "@public/icon-tilde.svg";
import Image from "next/image";
import { FieldGenericDateTime } from "@/components/feature/form/field-generic-datetime";
import { openModalMessage } from "@/components/feature/modal";
import { ArticlePopup } from "@/components/admin/article_popup";
import { toast } from "@/hooks/use-toast";

type FormAdminTopArticlesProps = {
  response?: AdminTopArticlesByIdResponseType | null;
  ids?: {
    topArticleId?: string;
    articleId?: string;
  };
  readonlyArticleTitle?: string;
  readonlyArticleContributorName?: string;
};

export const FormAdminTopArticlesCreateEdit = ({
  response,
  ids,
  readonlyArticleTitle,
  readonlyArticleContributorName,
}: FormAdminTopArticlesProps) => {
  const router = useRouter();
  const { data: info } = response || {};

  const form = useForm<z.infer<typeof formAdminTopArticlesSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formAdminTopArticlesSchema),
    defaultValues: {
      title: info?.article?.title
        ? info.article.title
        : readonlyArticleTitle || "",
      articleContributor: info?.article?.user?.contributor_name
        ? info.article.user.contributor_name
        : readonlyArticleContributorName || "",
      order: info?.order?.toString() ?? displayOrderValues[0].label,
      displayPeriod: "",
      publishedAt: info?.published_at
        ? new Date(info?.published_at)
        : undefined,
      publishEndedAt: info?.publish_ended_at
        ? new Date(info.publish_ended_at)
        : undefined,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  function handleClosePopup(): void {
    router.push("/admin/top_articles");
    router.refresh();
  }

  const onSubmit = async (
    formData: z.infer<typeof formAdminTopArticlesSchema>,
  ) => {
    form.reset(form.getValues());
    setIsLoading(true);
    let toCreateOrUpdateResponse;
    let method: "POST" | "PUT" = ids?.topArticleId ? "PUT" : "POST";

    try {
      toCreateOrUpdateResponse = await createOrUpdateAdminTopArticle({
        formData,
        idsToUpdate: ids,
        method: method,
      });

      if (toCreateOrUpdateResponse.success) {
        openModalMessage({
          title: "更新されました",
          message: "トップページに表示する記事が追加/更新されました。",
          handler: handleClosePopup,
        });
      } else {
        if (toCreateOrUpdateResponse.message === "注文はすでに受けている") {
          form.setError("order", {
            type: "orderDisplayed",
            message: "指定の表示順は既に設定されています。",
          });
        } else
          toast({
            title: "エラー",
            description: `${toCreateOrUpdateResponse.message}`,
          });
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToList = () => {
    router.push("/admin/top_articles");
    router.refresh();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Article Title */}
          <LabelFieldBlockDetailView
            label="記事タイトル"
            value={form.getValues("title") || ""}
          />

          {/* Article Contributor */}
          <div className="flex items-center justify-between">
            <LabelFieldBlockDetailView
              label="記事投稿者名"
              value={form.getValues("articleContributor") || ""}
            />
            <Button
              type="button"
              onClick={openDialog}
              className="mr-[1.375rem]"
            >
              記事変更
            </Button>
          </div>

          {/* Order */}
          <LabelFieldBlock className="lg:mb-[2px]">
            <LabelBlock className="text-white">表示順</LabelBlock>
            <FieldBlock>
              <FieldGenericSelect
                formHook={form}
                formInputName="order"
                labelText=""
                dropdownValues={displayOrderValues}
              />
              <CustomErrorMessage formHook={form} propertyName="order" />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Display Period */}
          <LabelFieldBlock>
            <LabelBlock className="mb-2.5 text-white">表示期間</LabelBlock>
            <FieldBlock className="max-w-[55rem]">
              <span className="block font-noto text-[.75rem] pb-[.625rem] text-dark-300">表示開始日は必ず入力してください</span>
              <div className="relative flex w-full place-items-end gap-10">
                <FieldGenericDateTime
                  formHook={form}
                  formInputName="publishedAt"
                  labelText=""
                  placeholder=""
                  hideErrorMessage={true}
                />
                <div className="absolute left-1/2 flex h-[2.5rem] -translate-x-1/2 transform items-center text-black">
                  <div className="flex h-full w-4">
                    <Image src={IconTilde} alt="icon filter" />
                  </div>
                </div>
                <FieldGenericDateTime
                  formHook={form}
                  formInputName="publishEndedAt"
                  labelText=""
                  placeholder=""
                  hideErrorMessage={true}
                />
              </div>
              {/* Custom Error Message */}
              <CustomErrorMessage formHook={form} propertyName="publishedAt" />
            </FieldBlock>
          </LabelFieldBlock>

          <div className="inline-flex w-full flex-row justify-center gap-[.75rem] px-[2.6875rem] pb-10 pt-10 lg:flex lg:flex-row lg:gap-5">
            <Button
              type="button"
              variant="secondary"
              onClick={handleBackToList}
              className="w-full lg:w-auto"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full lg:w-auto"
            >
              登録
            </Button>
          </div>
        </form>
      </Form>

      <ArticlePopup
        popupTitle="記事の検索"
        isOpen={isDialogOpen}
        closeDialog={closeDialog}
      />
    </>
  );
};
