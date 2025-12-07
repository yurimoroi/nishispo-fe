"use client";

import { z } from "zod";
import { registerFormSchema } from "./form-schema";
import { registerAdminFormSchema } from "@/components/admin/users";
import { UseFormReturn } from "react-hook-form";
import { UserDetailType } from "@/components/mypage";
import { AdminUserDetailType } from "@/components/admin/users/detail/lib/types";
import { FormEvent, useEffect } from "react";
import { useRegisterFromStore } from "./store";

/**
 * If editMode is false show the contributor checkbox
 * If editMode is true and contributorStatus is 0, do not show the checkbox
 * If editMode is true and contributorStatus is greater than 0, show the checkbox
 * 0 means user is not yet applying
 */
const getShowContributorCheckbox = ({
  isEditMode,
  contributorStatus,
}: {
  isEditMode: boolean;
  contributorStatus: number;
}): boolean => {
  if (!isEditMode && !contributorStatus) {
    return true;
  }

  if (isEditMode && contributorStatus > 0) {
    return false;
  }

  return true;
};

const isShowBadge = ({
  fieldValue,
  dependencyFieldValue,
}: {
  fieldValue: string;
  dependencyFieldValue: string;
}) => {
  if (fieldValue.trim() !== "") {
    return true;
  }

  if (fieldValue.trim() === "" && dependencyFieldValue.trim() !== "") {
    return false;
  }

  return true;
};

export const useFormRegister = ({
  form,
  isEditMode = false,
  info,
}: {
  form:
    | UseFormReturn<z.infer<typeof registerFormSchema>>
    | UseFormReturn<z.infer<typeof registerAdminFormSchema>>;
  isEditMode?: boolean;
  info: UserDetailType | AdminUserDetailType | undefined;
}) => {
  const contributorStatus = info?.contributor?.status || 0;
  const isShowContributorCheckbox = getShowContributorCheckbox({
    isEditMode,
    contributorStatus,
  });
  const isShowMobileNumberBadge = isShowBadge({
    fieldValue: form.getValues().mobilePhoneNumber,
    dependencyFieldValue: form.getValues().phoneNumber,
  });
  const isShowHouseNumberBadge = isShowBadge({
    fieldValue: form.getValues().phoneNumber,
    dependencyFieldValue: form.getValues().mobilePhoneNumber,
  });

  const handleEnterKeySubmit = (event: React.KeyboardEvent<HTMLFormElement>) => {
    // Only prevent Enter key default behavior if it's not in a textarea
    if (
      event.key === "Enter" &&
      event.target instanceof HTMLElement &&
      event.target.tagName !== "TEXTAREA"
    ) {
      event.preventDefault();
    }
  };

  // "Cache" the user email, we will use it for the "existing email" Zod validation
  useEffect(() => {
    useRegisterFromStore.setState({
      currentEmail: info?.email || "",
    });
  }, [info?.email]);

  return {
    contributorStatus,
    isShowContributorCheckbox,
    isShowMobileNumberBadge,
    isShowHouseNumberBadge,
    handleEnterKeySubmit,
  };
};
