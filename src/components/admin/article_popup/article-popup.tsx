import { Loading } from "@/components/feature/datatable";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Suspense, useEffect, useState } from "react";
import { MainTableData } from "./datatable";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common/label-field-block";
import {
  DropDownValuesType,
  FieldGenericSelect,
} from "@/components/feature/form/field-generic-select";
import {
  CustomErrorMessage,
  FieldGenericDate,
  FieldGenericInput,
} from "@/components/feature/form";
import { FieldMultipleCheckbox } from "@/components/feature/form/field-multiple-checkbox";
import Image from "next/image";
import IconTilde from "@public/icon-tilde.svg";
import { Button } from "@/components/ui/button";
import { formPopupArticleListSchema } from "./lib";
import { getAdminArticleStatus } from "../articles";
import { ArticleCategoryType } from "@/components/contributor";
import { getArticleCategories } from "@/components/feature/article-post";

type ArticlePopupProps = {
  isOpen: boolean;
  closeDialog: () => void;
  popupTitle?: string;
};

export const ArticlePopup = ({
  isOpen,
  closeDialog,
  popupTitle,
}: ArticlePopupProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<
    z.infer<typeof formPopupArticleListSchema>
  >({
    status: "",
    freeWord: "",
    categoryItems: [],
    publishedAt: "",
    publishEndedAt: "",
  });

  const [dropdownValues, setDropdownValues] = useState<DropDownValuesType[]>(
    [],
  );
  const [articleCategories, setArticleCategories] = useState<
    ArticleCategoryType[]
  >([]);

  const form = useForm<z.infer<typeof formPopupArticleListSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formPopupArticleListSchema),
    defaultValues: filters,
  });

  const onSubmit = async (
    formData: z.infer<typeof formPopupArticleListSchema>,
  ) => {
    setFilters(formData);
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

  // Get Article Categories
  useEffect(() => {
    const fetchArticleCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getArticleCategories();
        const { data = [] } = response;
        setArticleCategories(data);
      } catch (error) {
        console.error("Failed to fetch article categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleCategories();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">{popupTitle}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Status */}
              <LabelFieldBlock>
                <LabelBlock variant="empty" className="text-black">
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
              <LabelFieldBlock>
                <LabelBlock variant="empty" className="text-black">
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
                  />
                </FieldBlock>
              </LabelFieldBlock>

              {/* Publication Period */}
              <LabelFieldBlock>
                <LabelBlock variant="empty" className="mb-2.5 text-black">
                  表示期間
                </LabelBlock>
                <FieldBlock className="max-w-[55rem]">
                  <div className="relative flex w-full flex-col place-items-end gap-2 lg:flex-row lg:gap-10">
                    <FieldGenericDate
                      formHook={form}
                      formInputName="publishedAt"
                      labelText=""
                      currentValue={""}
                      hideErrorMessage={true}
                    />
                    <div className="absolute left-1/2 flex h-[2.5rem] -translate-x-1/2 transform items-center text-black">
                      <div className="hidden h-full w-4 lg:flex">
                        <Image src={IconTilde} alt="icon filter" />
                      </div>
                    </div>
                    <FieldGenericDate
                      formHook={form}
                      formInputName="publishEndedAt"
                      labelText=""
                      currentValue={""}
                      hideErrorMessage={true}
                    />
                  </div>
                  {/* Custom Error Message */}
                  <CustomErrorMessage
                    formHook={form}
                    propertyName="publishedAt"
                  />
                </FieldBlock>
              </LabelFieldBlock>

              {/* Buttons */}
              <div className="inline-flex w-full flex-row justify-center gap-[.75rem] lg:flex lg:flex-row lg:gap-2">
                <Button type="submit" disabled={isLoading} className="w-auto">
                  検索
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeDialog}
                  className="w-auto"
                >
                  閉じる
                </Button>
              </div>
            </form>
          </Form>
        </DialogDescription>

        {/* Table */}
        <Suspense fallback={<Loading />}>
          <MainTableData filters={filters} />
        </Suspense>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
