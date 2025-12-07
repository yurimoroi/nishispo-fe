"use client";

import { FormButtonsGeneric } from "@/components/feature/form";
import { resetRegisterFormValues } from "@/components/registration/lib/store";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type PageProps = {
  className?: string;
};

export const BlockButtonsHeaderSection = ({ className = "" }: PageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCsvExport = () => {
    const queryString = new URLSearchParams(searchParams).toString();

    router.push(
      `/download/csv?fileNamePrefix=users&endpoint=/users/admin/export&${queryString}`,
    );
  };

  const handleCreateAccount = () => {
    resetRegisterFormValues();
    router.push("/admin/users/new");
  };

  const buttons = [
    {
      label: "会員情報をCSV出力する",
      onClick: handleCsvExport,
      styles: "bg-blue-100 hover:bg-blue-200",
    },
    {
      label: "アカウント新規作成",
      onClick: handleCreateAccount,
      styles: "bg-blue-100 hover:bg-blue-200",
    },
  ];

  return (
    <div className={cn("w-full lg:w-fit", className)}>
      <FormButtonsGeneric
        className="flex flex-col gap-2 lg:flex-row lg:gap-10"
        buttons={buttons}
      />
    </div>
  );
};
