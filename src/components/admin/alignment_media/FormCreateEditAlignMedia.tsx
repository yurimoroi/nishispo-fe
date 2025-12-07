"use client";

import {
  FieldBlock,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import {
  CustomErrorMessage,
  FieldGenericDate,
  FieldGenericFileImage,
  FieldGenericInput,
  FormImagePreviewSingle,
  FormImagePreviewSingleBlock,
} from "@/components/feature/form";
import { useImagePreview } from "@/components/registration/lib/useImagePreview";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@components/ui//button";
import { zodResolver } from "@hookform/resolvers/zod";
import IconTilde from "@public/icon-tilde.svg";
import previewImage from "@public/placeholder/ImageSample.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlignMediaDetailsType,
  formAlignMediaSchema,
  formatDateToSlashFormat,
  formatDefaultDate,
  transformMediaDataToFormData,
} from "./lib";
import { createNewAlignMedia, updateAlignMedia } from "./lib/actions";

interface Props {
  alignMedia?: AlignMediaDetailsType;
}

export const FormCreateEditAlignMedia = ({ alignMedia }: Props) => {
  const [isClicked, setClicked] = useState(false);
  const isEditMode = Boolean(alignMedia);
  const listPageUrl = "/admin/alignment_media";
  const router = useRouter();

  const startDate =
    formatDateToSlashFormat(formatDefaultDate(alignMedia?.started_at || "")) ||
    "";
  const endDate =
    formatDateToSlashFormat(formatDefaultDate(alignMedia?.ended_at || "")) ||
    "";

  const form = useForm<z.infer<typeof formAlignMediaSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formAlignMediaSchema),
    defaultValues: {
      name: alignMedia?.name || "",
      banner: new File([], "") || "",
      url: alignMedia?.url || "",
      displayTopFlg: alignMedia?.display_top_flg === 1 ? 1 : 0,
      displayArticleListFlg: alignMedia?.display_article_list_flg === 1 ? 1 : 0,
      displayFlg: alignMedia?.display_flg === 1 ? 1 : 0,
      note: alignMedia?.note || "",
      startedAt: startDate,
      endedAt: endDate,
      order: alignMedia?.order || 0,
    },
  });

  const viewingFlags = [
    { name: "displayFlg", label: "表示する" },
    { name: "displayTopFlg", label: "トップページに表示する" },
    { name: "displayArticleListFlg", label: "ニュース一覧系ページに表示する" },
  ] as const;

  const { imagePreviewSource, onChangeFile, imagePreviewFileName } =
    useImagePreview({ imagePath: alignMedia?.banner || previewImage.src });

  const handleBackToMenu = () => {
    router.push(listPageUrl);
  };

  const onSubmit = async (values: z.infer<typeof formAlignMediaSchema>) => {
    const transformData = transformMediaDataToFormData(values, isEditMode);
    const pathRedirect = listPageUrl;

    try {
      setClicked(true);
      let response;

      if (isEditMode) {
        response = await updateAlignMedia(transformData, alignMedia!.id);
      } else {
        response = await createNewAlignMedia(transformData);
      }

      if (response?.success) {
        router.replace(pathRedirect);
        router.refresh();
      }

      if (response?.errors) {
        toast({
          title: "Error during creating Align Media",
          description:
            "An error occurred during the process. Please try again later.",
          variant: "destructive",
        });
      }

      setClicked(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "Error during creating Align Media",
        description: errorMessage,
      });
      setClicked(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative max-h-fit overflow-hidden"
      >
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base sm:text-lg">メディア名</span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="name"
              labelText=""
              placeholder=""
            />
          </FieldBlock>
        </LabelFieldBlock>

        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base sm:text-lg">メディアURL</span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="url"
              labelText=""
              placeholder=""
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base sm:text-lg">バナー画像</span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FormImagePreviewSingleBlock>
              <FormImagePreviewSingle
                className="cover lg:h-[7.875rem] lg:w-[13.75rem]"
                imageSource={imagePreviewSource}
                imageAlt="preview image"
              />
              <FieldGenericFileImage
                formHook={form}
                formInputName="banner"
                labelText="ファイルを選択"
                handleFileChange={onChangeFile}
              />
            </FormImagePreviewSingleBlock>
          </FieldBlock>
        </LabelFieldBlock>

        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock className="text-base sm:text-lg">表示</LabelBlock>
          <FieldBlock>
            <ul className="text-base sm:text-lg">
              {viewingFlags.map((field) => (
                <li
                  key={field.name}
                  className="flex items-center gap-2 pb-[.625rem]"
                >
                  <FormField
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={formField.value === 1}
                              onCheckedChange={(checked) => {
                                formField.onChange(checked ? 1 : 0);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-base font-normal sm:text-lg">
                            {field.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                </li>
              ))}
            </ul>
          </FieldBlock>
        </LabelFieldBlock>

        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock className="text-base sm:text-lg">表示順</LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              fieldType="number"
              formHook={form}
              formInputName="order"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>

        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock className="text-base sm:text-lg">掲載期間</LabelBlock>
          <FieldBlock>
            <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
              <FieldBlock className="max-w-[55rem] !px-0 !pt-0">
                <div className="relative">
                  <p className="mb-1 text-[.75rem] text-[#6C757D]">
                    表示開始日は必ず入力してください
                  </p>
                  <div className="flex w-full flex-col place-items-end gap-2 lg:flex-row lg:gap-10">
                    <FieldGenericDate
                      formHook={form}
                      formInputName="startedAt"
                      labelText=""
                      currentValue={startDate || ""}
                      hideErrorMessage={true}
                    />
                    <div className="absolute left-1/2 flex h-[2.5rem] -translate-x-1/2 transform items-center text-black">
                      <div className="hidden h-full w-4 lg:flex">
                        <Image src={IconTilde} alt="icon filter" />
                      </div>
                    </div>
                    <FieldGenericDate
                      formHook={form}
                      formInputName="endedAt"
                      labelText=""
                      currentValue={endDate || ""}
                      hideErrorMessage={true}
                    />
                  </div>
                </div>
                {/* Custom Error Message */}
                <CustomErrorMessage formHook={form} propertyName="startedAt" />
              </FieldBlock>
            </LabelFieldBlock>
          </FieldBlock>
        </LabelFieldBlock>

        <div className="mt-5r mb-14 mt-5 block justify-center md:mt-0 md:flex md:flex-row md:gap-5 md:pb-10 md:pt-10 lg:mb-0">
          <Button
            type="button"
            variant="secondary"
            onClick={handleBackToMenu}
            className="mb-5 w-full text-base md:mb-0 md:w-auto"
          >
            戻る
          </Button>
          <Button
            disabled={isClicked}
            className="w-full text-base md:w-auto"
            type="submit"
          >
            登録
          </Button>
        </div>
      </form>
    </Form>
  );
};
