"use client";

import {
  LabelFieldBlock,
  LabelBlock,
  FieldBlock,
  LabelBadge,
} from "@/components/feature/common/label-field-block";
import {
  CustomErrorMessage,
  FieldGenericInput,
} from "@/components/feature/form";
import { FieldColorPicker } from "@/components/feature/form/field-color-picker";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AdminArticleCategoryByIdResponseType,
  createOrUpdateAdminArticleCategory,
  formArticleCategoriesSchema,
} from "../lib";
import { FieldGenericSelect } from "@/components/feature/form/field-generic-select";
import { displayOrderValues } from "@/lib/dropdown-values";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { openModalMessage } from "@/components/feature/modal/modal-message";
import { toast } from "@/hooks/use-toast";

type FormAdminArticleCategoriesCreateEditProps = {
  response: AdminArticleCategoryByIdResponseType | null;
};

export const FormAdminArticleCategoriesCreateEdit = ({
  response,
}: FormAdminArticleCategoriesCreateEditProps) => {
  const router = useRouter();
  const { data: info } = response || {};
  const form = useForm<z.infer<typeof formArticleCategoriesSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formArticleCategoriesSchema),
    defaultValues: {
      name: info?.name || "",
      shortName: info?.short_name || "",
      color: info?.color || "#073774",
      order: info?.order?.toString() ?? displayOrderValues[0].label,
      showHeadFlg: info?.show_head_flg ? 1 : 0,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (
    formData: z.infer<typeof formArticleCategoriesSchema>,
  ) => {
    form.reset(form.getValues());
    setIsLoading(true);
    let toCreateOrUpdateResponse;
    try {
      if (!info) {
        toCreateOrUpdateResponse = await createOrUpdateAdminArticleCategory({
          formData,
        });
      } else {
        toCreateOrUpdateResponse = await createOrUpdateAdminArticleCategory({
          formData,
          idToUpdate: info.id,
        });
      }

      if (toCreateOrUpdateResponse.success) {
        openModalMessage({
          title: "更新完了",
          message: "記事カテゴリの更新が完了しました。",
          handler: handleClosePopup,
        });
      } else {
        if (toCreateOrUpdateResponse.message === "ソート番号の重複") {
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
    router.back();
  };

  function handleClosePopup(): void {
    router.push("/admin/article_categories");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Category Name */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>
            カテゴリ名 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="name"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>
        {/* Category Alias */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>カテゴリ名（短縮）</LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="shortName"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>
        {/* Color Picker */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>
            背景色 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldColorPicker
              formHook={form}
              propertyName="color"
              currentValue={form.watch("color")}
            />
          </FieldBlock>
        </LabelFieldBlock>
        {/* Display Order */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>表示順</LabelBlock>
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
        {/* Is included in header news */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>ニュースヘッダに表示するか否か</LabelBlock>
          <FieldBlock className="flex items-center gap-2">
            <Checkbox
              id="showHeadFlg"
              checked={form.watch("showHeadFlg") === 1}
              onCheckedChange={(checked) =>
                form.setValue("showHeadFlg", checked ? 1 : 0)
              }
              className="h-[1rem] w-[1rem]"
            />
            <label
              htmlFor="showHeadFlg"
              className="font-sans text-base font-normal"
            >
              表示する
            </label>
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
  );
};
