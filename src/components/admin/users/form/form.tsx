"use client";

import { useState, useEffect } from "react";
import {
  LabelFieldBlock,
  LabelBlock,
  FieldBlock,
} from "@/components/feature/common";
import { FieldMultipleCheckbox } from "@/components/feature/form/field-multiple-checkbox";
import {
  adminUsersApprovalStatusValues,
  adminUsersRoleCheckboxValues,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { adminUsersListFormSchema } from "../lib";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { adminUsersOrganizationsComboBoxValues } from "@/lib/combobox-values";
import { getAdminOrganizationNameList } from "../../teams";
import ComboBoxGeneric from "@/components/feature/form/field-generic-combobox";
import {
  FieldGenericInput,
  FieldGenericSelect,
} from "@/components/feature/form";
import { AdminUsersQueryKeys, getAdminUsersQueryString } from "../lib/helper";
import { setQueryParamValue } from "@/components/feature/datatable/lib";
import { ContributorStatusNameListResponseType } from "../lib/types";

type FormAdminUsersProps = {
  contributorNameList: ContributorStatusNameListResponseType;
  className?: string;
};

export const FormAdminUsers = ({
  contributorNameList,
}: FormAdminUsersProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [roleParamValue, setRoleParamValue] = useState<string>(
    searchParams.get("filter[role]") || "",
  );

  const [approvalStatusParamValue, setApprovalStatus] = useState<string>(
    searchParams.get("filter[article_status]") || "",
  );

  const [organizationNameParamValue, setOrganizationNameValue] =
    useState<string>(searchParams.get("filter[organization]") || "");

  const [organizationLabelParamValue, setOrganizationLabelValue] =
    useState<string>(searchParams.get("orgl") || "");

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof adminUsersListFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(adminUsersListFormSchema),
    defaultValues: {
      role: roleParamValue ? roleParamValue.split(",") : [],
      approvalStatus: approvalStatusParamValue,
      organizationName: organizationNameParamValue || "",
      organizationLabel: organizationLabelParamValue || "",
      search: "",
    },
  });

  const { data: adminOrganizationNameList = [] } = contributorNameList ?? {};

  const onSubmit = (data: z.infer<typeof adminUsersListFormSchema>) => {
    setIsLoading(true);
    form.trigger();
    if (form.formState.isValid) {
      const {
        role,
        approvalStatus,
        organizationName: organizationId,
        organizationLabel,
        search,
      } = data;

      const queryString = getAdminUsersQueryString({
        searchParams,
        queryParams: {
          [AdminUsersQueryKeys.ApprovalStatus]: setQueryParamValue(
            approvalStatus || "",
          ),

          [AdminUsersQueryKeys.OrganizationName]: setQueryParamValue(
            organizationId || "",
          ),

          // Combobox Labels
          [AdminUsersQueryKeys.OrganizationLabel]: setQueryParamValue(
            organizationLabel || "",
          ),

          [AdminUsersQueryKeys.Search]: setQueryParamValue(search || ""),
          [AdminUsersQueryKeys.Role]: setQueryParamValue(
            (role ?? []).join(","),
          ),
          page: "1",
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
          {/* Type */}
          <LabelFieldBlock className="lg:mb-0">
            <LabelBlock variant="empty" className="px-0 text-black lg:px-4">
              権限
            </LabelBlock>
            <FieldBlock>
              <FieldMultipleCheckbox
                formHook={form}
                formInputName="role"
                items={adminUsersRoleCheckboxValues}
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Status */}
          <LabelFieldBlock className="flex-col lg:flex-row">
            <LabelBlock
              variant="empty"
              className="mb-3 w-full px-0 text-black lg:w-[7.5rem] lg:px-4"
            >
              承認ステータス
            </LabelBlock>
            <FieldBlock>
              <FieldGenericSelect
                formHook={form}
                formInputName="approvalStatus"
                labelText=""
                dropdownValues={adminOrganizationNameList}
              />
            </FieldBlock>
          </LabelFieldBlock>

          {/* Organization List Combo Box */}
          <LabelFieldBlock className="flex-col lg:mb-0 lg:flex-row">
            <LabelBlock
              variant="empty"
              className="mb-3 w-full px-0 text-black lg:w-[7.5rem] lg:px-4"
            >
              所属組織
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
          <LabelFieldBlock className="flex-col lg:flex-row">
            <LabelBlock
              variant="empty"
              className="mb-3 w-full px-0 text-black lg:w-[7.5rem] lg:px-4"
            >
              フリーワード検索
            </LabelBlock>
            <FieldBlock>
              <FieldGenericInput
                formHook={form}
                formInputName="search"
                labelText=""
              />
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
