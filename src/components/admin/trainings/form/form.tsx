"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  FieldBlock,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import {
  FieldGenericInput,
  FieldGenericSelect,
  FieldGenericTextArea,
} from "@/components/feature/form";
import { trainingNumberValues, trainingTypeValues } from "@/lib";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  AdminTrainingsByIdResponseType,
  createOrUpdateAdminTrainings,
  formAdminTrainingListSchema,
} from "../lib";
import { openModalMessage } from "@/components/feature/modal";
import { toast } from "@/hooks/use-toast";

type FormAdminTrainingsCreateEditProps = {
  response?: AdminTrainingsByIdResponseType | null;
};

export const FormAdminTrainingsCreateEdit = ({
  response,
}: FormAdminTrainingsCreateEditProps) => {
  const router = useRouter();
  const { data: info } = response || {};

  const form = useForm<z.infer<typeof formAdminTrainingListSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formAdminTrainingListSchema),
    defaultValues: {
      trainingNo: info?.no
        ? String(info.no)
        : String(trainingNumberValues[1].id),
      title: info?.title || "",
      trainingType: String(info?.type ?? trainingTypeValues[0].id),
      trainingOverview: info?.overview || "",
      trainingUrl: info?.url || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (
    formData: z.infer<typeof formAdminTrainingListSchema>,
  ) => {
    form.reset(form.getValues());
    setIsLoading(true);
    let toCreateOrUpdateResponse;
    try {
      if (!info) {
        toCreateOrUpdateResponse = await createOrUpdateAdminTrainings({
          formData,
        });
      } else {
        toCreateOrUpdateResponse = await createOrUpdateAdminTrainings({
          formData,
          idToUpdate: info.id,
        });
      }
      if (toCreateOrUpdateResponse.success) {
        openModalMessage({
          title: "完了しました",
          message: "研修内容の作成が完了しました。",
          handler: handleClosePopup,
        });
      } else {
        toast({
          title: "Error",
          description: toCreateOrUpdateResponse.message
            ? toCreateOrUpdateResponse.message
            : "Error creating or updating training.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error
          ? String(error)
          : "Error creating or updating training.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  function handleClosePopup(): void {
    router.push("/admin/trainings");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Training No. */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>研修番号</LabelBlock>
          <FieldBlock>
            <FieldGenericSelect
              formHook={form}
              formInputName="trainingNo"
              labelText=""
              dropdownValues={trainingNumberValues}
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* Training Title */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>
            研修タイトル <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="title"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* Training Type */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>研修タイプ</LabelBlock>
          <FieldBlock>
            <FieldGenericSelect
              formHook={form}
              formInputName="trainingType"
              labelText=""
              dropdownValues={trainingTypeValues}
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* Training Overview */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>研修概要</LabelBlock>
          <FieldBlock>
            <FieldGenericTextArea
              formHook={form}
              formInputName="trainingOverview"
              labelText=""
              textAreaClassName="h-[4.375rem]"
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* Training URL */}
        <LabelFieldBlock className="lg:mb-[.125rem]">
          <LabelBlock>
            URL <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="trainingUrl"
              labelText=""
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
            登録
          </Button>
        </div>
      </form>
    </Form>
  );
};
