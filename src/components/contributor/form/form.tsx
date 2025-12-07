"use client";
import { Form } from "@/components/ui/form";
import { FormButtonsGroup } from "./form-button-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formArticleListSchema } from "@/components/admin/articles";
import { z } from "zod";
import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import {
  DropDownValuesType,
  FieldGenericInput,
  FieldGenericSelect,
} from "@/components/feature/form";
import { FieldMultipleCheckbox } from "@/components/feature/form/field-multiple-checkbox";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getUserArticleQueryString,
  UserArticlesQueryKeys,
} from "../lib/helper";
import { setQueryParamValue } from "@/components/feature/datatable/lib";
import { ArticleCategoryType, UserArticlesCountDataType } from "../lib";
import { contributorArticleStatusParamKey } from "../lib/param-keys";

type FormArticlesContributorProps = {
  dropdownValues: DropDownValuesType[];
  articleCountData?: UserArticlesCountDataType;
  articleCategories: ArticleCategoryType[];
};

export const FormArticlesContributor = ({
  dropdownValues,
  articleCountData,
  articleCategories,
}: FormArticlesContributorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formArticleListSchema>>({
    mode: "onBlur", // This ensures validation runs on blur
    reValidateMode: "onBlur", // This ensures revalidation happens on blur
    criteriaMode: "all", // Collects all errors if any
    resolver: zodResolver(formArticleListSchema),
    defaultValues: {
      status: "",
      freeWord: "",
      categoryItems: [],
    },
  });

  //#region Event Handlers
  const handleClickAll = () => {
    const queryString = "";
    router.push(`${pathname}?${queryString}`);
    router.refresh();
  };

  const handleClickCurrentArticle = () => {
    const queryString = getUserArticleQueryString({
      searchParams,
      queryParams: {
        [UserArticlesQueryKeys.Status]: setQueryParamValue(
          contributorArticleStatusParamKey.published,
        ),
      },
    });

    router.push(`${pathname}?${queryString}`);
    router.refresh();
  };

  const handleClickArticleInProgress = () => {
    const queryString = getUserArticleQueryString({
      searchParams,
      queryParams: {
        [UserArticlesQueryKeys.Status]: setQueryParamValue(
          `${contributorArticleStatusParamKey.applyingPublish},${contributorArticleStatusParamKey.requestEdit},${contributorArticleStatusParamKey.requestDelete}`,
        ),
      },
    });

    router.push(`${pathname}?${queryString}`);
    router.refresh();
  };

  const handleClickRemandedArticle = () => {
    const queryString = getUserArticleQueryString({
      searchParams,
      queryParams: {
        [UserArticlesQueryKeys.Status]: setQueryParamValue(
          contributorArticleStatusParamKey.remand,
        ),
      },
    });

    router.push(`${pathname}?${queryString}`);
    router.refresh();
  };

  const buttons = [
    {
      id: "all",
      label: "すべて",
      itemCountBgColor: "bg-blue-100",
      articleCount: articleCountData?.count,
      onClick: handleClickAll,
      styles: "bg-blue-300",
    },
    {
      id: "currentArticle",
      label: "掲載中記事",
      articleCount: articleCountData?.published,
      itemCountBgColor: "bg-shade-700",
      onClick: handleClickCurrentArticle,
      styles: "bg-shade-400",
    },
    {
      id: "articleInProgress",
      label: "申請中記事",
      articleCount:
        Number(articleCountData?.applying_publish) +
        Number(articleCountData?.request_edit) +
        Number(articleCountData?.request_delete),
      itemCountBgColor: "bg-shade-700",
      onClick: handleClickArticleInProgress,
      styles: "bg-shade-400",
    },
    {
      id: "remandedArticle",
      label: "差し戻し記事",
      articleCount: articleCountData?.remand,
      itemCountBgColor: "bg-shade-700",
      onClick: handleClickRemandedArticle,
      styles: "bg-shade-400",
    },
  ];

  const triggerFormSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      form.handleSubmit((data: z.infer<typeof formArticleListSchema>) => {
        const { status, freeWord, categoryItems } = data;

        const queryString = getUserArticleQueryString({
          searchParams,
          queryParams: {
            [UserArticlesQueryKeys.Status]: setQueryParamValue(status || ""),
            [UserArticlesQueryKeys.Search]: setQueryParamValue(freeWord || ""),
            [UserArticlesQueryKeys.Categories]: setQueryParamValue(
              (categoryItems || []).join(","),
            ),
          },
        });

        router.push(`${pathname}?${queryString}`);
        router.refresh();
      })();
    }
  };

  //#endregion

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(triggerFormSubmit)}>
          {/* Button Group */}
          <div className="button-group flex gap-1">
            <FormButtonsGroup buttons={buttons} className="w-full gap-1" />
          </div>

          {/* Form Fields */}
          <div className="mx-6 mt-5 border-4 border-shade-400 p-5 lg:mx-0 lg:mb-5 lg:mt-0 lg:p-5">
            {/* Free Word */}
            <LabelFieldBlock className="flex-col lg:flex-row">
              <LabelBlock
                variant="empty"
                className="w-full text-black lg:w-[7.5rem]"
              >
                フリーワード検索
              </LabelBlock>
              <FieldBlock>
                <FieldGenericInput
                  formHook={form}
                  formInputName="freeWord"
                  labelText=""
                  onBlur={triggerFormSubmit}
                />
              </FieldBlock>
            </LabelFieldBlock>

            {/* Article Categories */}
            <LabelFieldBlock>
              <LabelBlock variant="empty" className="text-black">
                記事カテゴリ
              </LabelBlock>
              <FieldBlock>
                <FieldMultipleCheckbox
                  formHook={form}
                  formInputName="categoryItems"
                  items={articleCategories.map((category) => ({
                    label: category.name,
                    id: category.id,
                  }))}
                  onChange={triggerFormSubmit}
                />
              </FieldBlock>
            </LabelFieldBlock>

            {/* Article Status */}
            <LabelFieldBlock className="flex-col lg:flex-row">
              <LabelBlock
                variant="empty"
                className="w-full text-black lg:w-[7.5rem]"
              >
                ステータス
              </LabelBlock>
              <FieldBlock>
                <FieldGenericSelect
                  formHook={form}
                  formInputName="status"
                  labelText=""
                  dropdownValues={dropdownValues}
                  onChange={triggerFormSubmit}
                />
              </FieldBlock>
            </LabelFieldBlock>
          </div>

          {/* Links */}
          <div className="my-5 flex w-full items-center justify-center gap-10 lg:justify-normal">
            <Link
              href="/contributor/article/new"
              className="rounded-[.375rem] bg-blue-100 px-[.375rem] py-3 text-white"
            >
              記事新規作成
            </Link>
            <Link
              href="/contributors/trainings"
              className="rounded-none bg-transparent font-normal text-blue-100 underline shadow-none hover:bg-transparent"
            >
              研修一覧
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
