"use client";

import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import {
  CustomErrorMessage,
  DropDownValuesType,
  FieldGenericDate,
  FieldGenericInput,
  FieldGenericSelect,
} from "@/components/feature/form";
import { FieldMultipleCheckbox } from "@/components/feature/form/field-multiple-checkbox";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import IconTilde from "@public/icon-tilde.svg";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { formArticleListSchema, getAdminArticleStatus } from "../lib";
import { useEffect, useState } from "react";
import {
  AdminArticlesQueryKeys,
  getAdminArticleQueryString,
} from "../lib/helper";
import { setQueryParamValue } from "@/components/feature/datatable/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArticleCategoryType } from "@/components/contributor";

export const FormAdminArticles = ({
  articleCategories,
}: {
  articleCategories: ArticleCategoryType[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [articleStatusValue, setArticleStatusValue] = useState<string>(
    searchParams.get("filter[status]") || "",
  );

  const [categoryParamValue, setCategoryParamValue] = useState<string>(
    searchParams.get("filter[categories]") || "",
  );

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formArticleListSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formArticleListSchema),
    defaultValues: {
      status: articleStatusValue,
      freeWord: "",
      categoryItems: categoryParamValue ? categoryParamValue.split(",") : [],
      publishedAt: "",
      publishEndedAt: "",
    },
  });

  const [dropdownValues, setDropdownValues] = useState<DropDownValuesType[]>(
    [],
  );

  const onSubmit = (data: z.infer<typeof formArticleListSchema>) => {
    setIsLoading(true);
    form.trigger();
    if (form.formState.isValid) {
      const { status, freeWord, categoryItems, publishedAt, publishEndedAt } =
        data;

      const publicationPeriod =
        publishedAt || publishEndedAt
          ? `${publishedAt ?? ""},${publishEndedAt ?? ""}`
          : "";

      const queryString = getAdminArticleQueryString({
        searchParams,
        queryParams: {
          [AdminArticlesQueryKeys.Status]: setQueryParamValue(status || ""),
          [AdminArticlesQueryKeys.Search]: setQueryParamValue(freeWord || ""),
          [AdminArticlesQueryKeys.Categories]: setQueryParamValue(
            (categoryItems || []).join(","),
          ),
          [AdminArticlesQueryKeys.Dates]: setQueryParamValue(
            publicationPeriod ?? "",
          ),
        },
      });

      router.push(`${pathname}?${queryString}`);
      router.refresh();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchDropdownValues = async () => {
      try {
        setIsLoading(true);
        const response = await getAdminArticleStatus();
        const { data } = response;
        setDropdownValues(data);
      } catch (error) {
        console.error("Failed to fetch dropdown values:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDropdownValues();
  }, []);

  return (
    <div className="border-4 border-shade-400 p-5 lg:mb-5 lg:p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Status */}
          <LabelFieldBlock className="flex-row lg:flex-row">
            <LabelBlock
              variant="empty"
              className="w-[7.5rem] px-0 text-black lg:px-4"
            >
              ステータス
            </LabelBlock>
            <FieldBlock>
              <FieldGenericSelect
                formHook={form}
                formInputName="status"
                labelText=""
                dropdownValues={dropdownValues}
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Free Word */}
          <LabelFieldBlock className="flex-row lg:flex-row">
            <LabelBlock
              variant="empty"
              className="w-[7.5rem] px-0 text-black lg:px-4"
            >
              フリーワード検索
            </LabelBlock>
            <FieldBlock>
              <FieldGenericInput
                formHook={form}
                formInputName="freeWord"
                labelText=""
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Article Categories */}
          <LabelFieldBlock>
            <LabelBlock variant="empty" className="px-0 text-black lg:px-4">
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
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Publication Period */}
          <LabelFieldBlock>
            <LabelBlock
              variant="empty"
              className="mb-2.5 px-0 text-black lg:px-4"
            >
              表示期間
            </LabelBlock>
            <FieldBlock className="max-w-[55rem]">
              <div className="relative flex w-full flex-col place-items-end gap-5 lg:flex-row lg:gap-10">
                <FieldGenericDate
                  formHook={form}
                  formInputName="publishedAt"
                  labelText=""
                  currentValue={""}
                  hideErrorMessage={true}
                />
                <div className="absolute left-1/2 hidden h-[2.5rem] -translate-x-1/2 transform items-center text-black lg:flex">
                  <div className="flex h-full w-4">
                    <Image src={IconTilde} alt="icon filter" />
                  </div>
                </div>
                <FieldGenericDate
                  formHook={form}
                  formInputName="publishEndedAt"
                  labelText=""
                  currentValue={""}
                />
              </div>
              {/* Custom Error Message */}
              <CustomErrorMessage formHook={form} propertyName="publishedAt" />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Buttons */}
          <div className="inline-flex w-full flex-row justify-center lg:flex lg:flex-row lg:justify-end">
            <Button type="submit" disabled={isLoading} className="w-auto">
              検索
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
