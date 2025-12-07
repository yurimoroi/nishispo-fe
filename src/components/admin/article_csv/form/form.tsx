"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  FieldBlock,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formAdminCsvSchema } from "../lib";
import { FieldGenericDateTime } from "@/components/feature/form/field-generic-datetime";
import { CustomErrorMessage } from "@/components/feature/form";
import Image from "next/image";
import IconTilde from "@public/icon-tilde.svg";
import { toast } from "@/hooks/use-toast";
import { convertDateToJPDashWithTime } from "@/lib/utils";

type FormAdminTrainingsCreateEditProps = {
  response?: any; // TODO: to be corrected once API is ready
};

export const FormAdminArticleCsv = ({
  response,
}: FormAdminTrainingsCreateEditProps) => {
  const router = useRouter();
  const { data: info } = response || {};

  const form = useForm<z.infer<typeof formAdminCsvSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formAdminCsvSchema),
    defaultValues: {
      outputPeriodStart: info?.outputPeriodStart
        ? new Date(info?.outputPeriodStart)
        : new Date(),
      outputPeriodEnd: info?.outputPeriodEnd
        ? new Date(info?.outputPeriodEnd)
        : new Date(),
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // useEffect to handle updating the end date when start date changes
  useEffect(() => {
    const startDate = form.getValues("outputPeriodStart");
    if (startDate) {
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + 7); // Add 7 days to the start date
      form.setValue("outputPeriodEnd", newEndDate); // Update the end date in the form
    }
  }, [form]); // Trigger this effect when outputPeriodStart changes

  const onSubmit = (formData: z.infer<typeof formAdminCsvSchema>) => {
    try {
      setIsLoading(true);
      const startDate = convertDateToJPDashWithTime(formData.outputPeriodStart);
      const endDate = convertDateToJPDashWithTime(formData.outputPeriodEnd);
      const downloadUrl = `/download/csv?fileNamePrefix=rakuten_point_list&endpoint=/articles/export/distribution-point&start_date=${startDate}&end_date=${endDate}&_=${new Date().getTime()}`;
      router.push(downloadUrl);
      router.refresh();
    } catch (error) {
      toast({
        title: "エラー",
        description: "エラーが発生しました。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Output Period */}
        <LabelFieldBlock>
          <LabelBlock className="mb-2.5 text-white">
            出力期間 <LabelBadge />
          </LabelBlock>
          <FieldBlock className="max-w-[55rem]">
            <div className="relative flex w-full place-items-end gap-10">
              <FieldGenericDateTime
                formHook={form}
                formInputName="outputPeriodStart"
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
                formInputName="outputPeriodEnd"
                labelText=""
                placeholder=""
                hideErrorMessage={true}
              />
            </div>
            {/* Custom Error Message */}
            <CustomErrorMessage
              formHook={form}
              propertyName="outputPeriodStart"
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
            className="w-full hover:bg-opacity-[.8] lg:w-auto"
          >
            登録
          </Button>
        </div>
      </form>
    </Form>
  );
};
