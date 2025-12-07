"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  FieldBlock,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import {
  FieldGenericFileImage,
  FieldGenericInput,
  FieldGenericTextArea,
  FormImagePreviewSingle,
  FormImagePreviewSingleBlock,
} from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldGenericDateTime } from "@/components/feature/form/field-generic-datetime";
import PlaceholderImage from "@public/placeholder/ImageSample.png";
import {
  AdminInformationsByIdResponseType,
  formAdminInformationsSchema,
  submitInformation,
  updateInformation,
} from "../lib";
import { toast } from "@/hooks/use-toast";
import {
  convertDateToJPDashWithTime,
  formatResponseError,
  getConvertedSingleLinkToFile,
} from "@/lib/utils";
import { useImagePreview } from "@/components/registration/lib/useImagePreview";
import { convertToFormData } from "../lib/helper";

type FormAdminTrainingsCreateEditProps = {
  response?: AdminInformationsByIdResponseType;
};

export const FormAdminInformationsCreateEdit = ({
  response,
}: FormAdminTrainingsCreateEditProps) => {
  const router = useRouter();
  const { data: info } = response || {};

  const form = useForm<z.infer<typeof formAdminInformationsSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formAdminInformationsSchema),
    defaultValues: {
      title: info?.title || "",
      releasePeriodStart: info?.published_at
        ? new Date(info?.published_at)
        : undefined, // Ensure default is undefined if not provided
      releasePeriodEnd: info?.finished_at
        ? new Date(info.finished_at)
        : undefined, // Similarly, handle the end date
      body: info?.body || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  // const [imagePreviewSource, setImagePreviewSource] = useState<string | null>(
  //   null,
  // );

  const { imagePreviewSource, onChangeFile } = useImagePreview({
    imagePath: info?.info_images,
  });

  // On edit mode, when the images arrive, update the input
  useEffect(() => {
    const fetchData = async () => {
      // Sending the images from a server component causes plain object error, so we opt in using useEffect
      if (info?.info_images) {
        const file = await getConvertedSingleLinkToFile(info?.info_images);
        form.setValue("uploadFile", file);
      }
    };

    fetchData();
  }, [info?.info_images, form]);

  const onSubmit = async (
    formValues: z.infer<typeof formAdminInformationsSchema>,
  ) => {

    try {
      form.reset(form.getValues());
      setIsLoading(true);
      let response = null;
      const isEditMode = info ? true : false;
      const transformedData = convertToFormData(formValues, isEditMode);

      if (!isEditMode) {
        response = await submitInformation(transformedData);
      } else {
        if (info?.id) {
          response = await updateInformation(transformedData, info.id);
        } else {
          toast({
            title: "Informations Error",
            description: "Invalid information ID",
          });
        }
      }

      if (!response?.success) {
        toast({
          title: "Informations Warning",
          description: formatResponseError(response?.message),
        });
      } else {
        router.push("/admin/informations");
        router.refresh();
      }
    } catch (error) {
      toast({ title: "Informations Error", description: String(error) });
    } finally {
      setIsLoading(false);
    }
  };

  function handleClosePopup(): void {
    router.push("/admin/informations");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Informations Title */}
        <LabelFieldBlock>
          <LabelBlock>
            タイトル <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="title"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* Release Period Start */}
        <LabelFieldBlock>
          <LabelBlock className="mb-2.5 text-white">公開開始日時</LabelBlock>
          <FieldBlock>
            <FieldGenericDateTime
              formHook={form}
              formInputName="releasePeriodStart"
              labelText=""
              placeholder=""
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* Release Period End */}
        <LabelFieldBlock>
          <LabelBlock className="mb-2.5 text-white">公開終了日時</LabelBlock>
          <FieldBlock>
            <FieldGenericDateTime
              formHook={form}
              formInputName="releasePeriodEnd"
              labelText=""
              placeholder=""
            />
          </FieldBlock>
        </LabelFieldBlock>

        <LabelFieldBlock>
          <LabelBlock>
            本文 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericTextArea
              formHook={form}
              formInputName="body"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* Image */}
        <LabelFieldBlock>
          <LabelBlock>お知らせ画像</LabelBlock>
          <FieldBlock>
            <FormImagePreviewSingleBlock>
              {/* Display the preview image */}
              <FormImagePreviewSingle
                imageSource={imagePreviewSource || PlaceholderImage.src}
                imageAlt="preview image"
                className="lg:h-[7.875rem] lg:w-[13.6875rem]"
              />
              {/* File upload input */}
              <FieldGenericFileImage
                formHook={form}
                formInputName="uploadFile"
                labelText="ファイルを選択"
                handleFileChange={onChangeFile}
              />
            </FormImagePreviewSingleBlock>
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
            登録
          </Button>
        </div>
      </form>
    </Form>
  );
};
