"use client";

import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
  LabelFieldBlockDetailView,
} from "@/components/feature/common";
import {
  CustomErrorMessage,
  DropDownValuesType,
  FieldGenericCheckbox,
  FieldGenericDate,
  FieldGenericInput,
  FieldGenericSelect,
} from "@/components/feature/form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ComboBoxGeneric from "@/components/feature/form/field-generic-combobox";
import { formAdminTeamsSchema } from "../lib/form-schema";
import {
  AdminTeamsQueryKeys,
  getAdminOrganizationNameList,
  getAdminTeamsQueryString,
} from "../lib";
import { FieldMultipleCheckbox } from "@/components/feature/form/field-multiple-checkbox";
import { paymentTypeCheckboxValues } from "@/lib";
import { setQueryParamValue } from "@/components/feature/datatable/lib";

export const FormAdminTeams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [organizationNameParamValue, setOrganizationNameValue] =
    useState<string>(searchParams.get("filter[org]") || "");

  const [organizationLabelParamValue, setOrganizationLabelValue] =
    useState<string>(searchParams.get("orgl") || "");

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formAdminTeamsSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formAdminTeamsSchema),
    defaultValues: {
      organizationName: organizationNameParamValue || "",
      organizationLabel: organizationLabelParamValue || "",
      freeWord: "",
      paymentTypeItems: [],
      isNextUseRights: false,
      isUnpaid: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formAdminTeamsSchema>) => {
    setIsLoading(true);
    form.trigger();
    if (form.formState.isValid) {
      const {
        organizationName: organizationId,
        organizationLabel,
        freeWord,
        paymentTypeItems,
        isNextUseRights,
        isUnpaid,
      } = data;

      const queryString = getAdminTeamsQueryString({
        searchParams,
        queryParams: {
          [AdminTeamsQueryKeys.Name]: setQueryParamValue(organizationId || ""),
          // Combobox Labels
          [AdminTeamsQueryKeys.OrganizationLabel]: setQueryParamValue(
            organizationLabel || "",
          ),
          [AdminTeamsQueryKeys.Search]: setQueryParamValue(freeWord || ""),
          [AdminTeamsQueryKeys.PaymentType]: setQueryParamValue(
            (paymentTypeItems ?? []).join(","),
          ),
          [AdminTeamsQueryKeys.DateExpired]: setQueryParamValue(
            isNextUseRights ? "true" : "",
          ),
          [AdminTeamsQueryKeys.Unpaid]: setQueryParamValue(
            isUnpaid ? "true" : "",
          ),
        },
      });
      router.push(`${pathname}?${queryString}`);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="border-4 border-shade-400 p-5 lg:mb-5 lg:p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Organization List Combo Box */}
          <LabelFieldBlock className="flex-row lg:mb-0 lg:flex-row">
            <LabelBlock variant="empty" className="w-[7.5rem] text-black">
              組織一覧
            </LabelBlock>
            <FieldBlock>
              <ComboBoxGeneric
                formHook={form}
                formInputName="organizationName"
                formInputLabel="organizationLabel"
                initialLabel={form.getValues("organizationLabel")}
                getListDataCall={getAdminOrganizationNameList}
                labelText=""
                buttonClassName="shadow-input"
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Free Word */}
          <LabelFieldBlock className="flex-row lg:mb-0 lg:flex-row">
            <LabelBlock variant="empty" className="w-[7.5rem] text-black">
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

          {/* Payment Type */}
          <LabelFieldBlock className="lg:mb-0">
            <LabelBlock variant="empty" className="text-black">
              決済種別
            </LabelBlock>
            <FieldBlock>
              <FieldMultipleCheckbox
                formHook={form}
                formInputName="paymentTypeItems"
                items={paymentTypeCheckboxValues}
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Is Next Use Rights*/}
          <LabelFieldBlock className="lg:mb-0">
            <LabelBlock variant="empty" className="text-black">
              次回利用権
            </LabelBlock>
            <FieldBlock>
              <FieldGenericCheckbox
                formHook={form}
                formInputName="isNextUseRights"
                labelText="未作成"
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Is Unpaid */}
          <LabelFieldBlock className="lg:mb-0">
            <LabelBlock variant="empty" className="text-black">
              未入金
            </LabelBlock>
            <FieldBlock>
              <FieldGenericCheckbox
                formHook={form}
                formInputName="isUnpaid"
                labelText="未入金あり"
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Buttons */}
          <div className="inline-flex w-full flex-row justify-end lg:flex lg:flex-row">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full lg:w-auto"
            >
              検索
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
