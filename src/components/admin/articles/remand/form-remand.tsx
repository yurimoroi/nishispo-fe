"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { remandFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
  PageTitle,
} from "@/components/feature/common";
import { FieldGenericTextArea } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { saveRemand } from "./lib/actions";
import { openModalMessage } from "@/components/feature/modal";
import { ArticleAdminDetailDataType } from "../lib/types";
import { setArticlePreviewByEndpoint } from "@/components/feature/article-preview";
import { openModalArticlePreview } from "@/components/feature/modal/modal-article-preview";
import { useRouter } from "next/navigation";

type FormRemandProps = {
  articleIdToRemand: string;
  articleDetail: ArticleAdminDetailDataType;
};

export const FormRemand = ({
  articleIdToRemand,
  articleDetail,
}: FormRemandProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof remandFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(remandFormSchema),
    defaultValues: {
      titleRemand: "",
      bodyRemand: "",
      imageRemand: "",
      otherRemand: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof remandFormSchema>) => {
    try {
      setIsLoading(true);

      const response = await saveRemand(values, articleIdToRemand);

      if (!response?.success) {
        toast({
          title: "Remand Article Warning",
          description: response?.message,
        });
      } else {
        openModalMessage({
          title: "差し戻し完了",
          message: "記事の差し戻しが完了しました",
        });
        router.push("/admin/articles");
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Remand Article Warning",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleArticlePreview = async () => {
    await setArticlePreviewByEndpoint(articleDetail);
    openModalArticlePreview();
  };

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>記事差し戻し</PageTitle>
        <Button
          type="button"
          className="!height-[1.5rem] block lg:hidden"
          onClick={handleArticlePreview}
        >
          プレビュー
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <LabelFieldBlock>
              <LabelBlock>記事タイトル</LabelBlock>
              <FieldBlock>{articleDetail.title}</FieldBlock>
            </LabelFieldBlock>

            <LabelFieldBlock>
              <LabelBlock>記事投稿者名</LabelBlock>
              <FieldBlock>{articleDetail?.user?.contributor_name || "-"}</FieldBlock>
            </LabelFieldBlock>

            <Button
              type="button"
              className="!height-[1.5rem] absolute right-0 top-1/2 hidden -translate-y-1/2 transform lg:block"
              onClick={handleArticlePreview}
            >
              プレビュー
            </Button>
          </div>
          <LabelFieldBlock>
            <LabelBlock>記事タイトルへの差し戻しコメント</LabelBlock>
            <FieldBlock>
              <FieldGenericTextArea
                formHook={form}
                formInputName="titleRemand"
                labelText=""
                textAreaClassName="h-[62px] lg:h-[116px]"
              />
            </FieldBlock>
          </LabelFieldBlock>
          <LabelFieldBlock>
            <LabelBlock>本文への差し戻しコメント</LabelBlock>
            <FieldBlock>
              <FieldGenericTextArea
                formHook={form}
                formInputName="bodyRemand"
                labelText=""
                textAreaClassName="h-[62px] lg:h-[116px]"
              />
            </FieldBlock>
          </LabelFieldBlock>
          <LabelFieldBlock>
            <LabelBlock>画像への差し戻しコメント</LabelBlock>
            <FieldBlock>
              <FieldGenericTextArea
                formHook={form}
                formInputName="imageRemand"
                labelText=""
                textAreaClassName="h-[62px] lg:h-[116px]"
              />
            </FieldBlock>
          </LabelFieldBlock>
          <LabelFieldBlock>
            <LabelBlock>その他差し戻しコメント</LabelBlock>
            <FieldBlock>
              <FieldGenericTextArea
                formHook={form}
                formInputName="otherRemand"
                labelText=""
                textAreaClassName="h-[62px] lg:h-[116px]"
              />
            </FieldBlock>
          </LabelFieldBlock>
          <div className="flex-2.5 flex gap-2.5 pb-10 lg:justify-center lg:pb-[4.625rem]">
            <Button variant="secondary" asChild>
              <Link href={`/admin/articles/${articleIdToRemand}`}>
                キャンセル
              </Link>
            </Button>
            <Button disabled={isLoading}>差し戻し</Button>
          </div>
        </form>
      </Form>
    </>
  );
};
