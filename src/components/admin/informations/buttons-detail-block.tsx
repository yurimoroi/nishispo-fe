"use client";
import { FormButtonsGeneric } from "@/components/feature/form";
import { useRouter, useParams } from "next/navigation";

export const ButtonsDetailBlock = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the ID from the URL

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    router.push(`/admin/informations/${id}/edit`);
  };

  const buttons = [
    {
      id: "cancel",
      label: "戻る",
      styles:
        "text-xs lg:text-base shadow-button bg-white border-blue-100 border-[2px] text-blue-100 hover:bg-white font-bold",
      onClick: handleCancel,
    },
    {
      id: "submit",
      label: "編集",
      styles: "primary",
      onClick: handleSubmit,
    },
  ];

  return (
    <FormButtonsGeneric
      className="inline-flex w-full flex-row justify-center gap-[.75rem] px-[2.6875rem] pb-10 pt-10 lg:flex lg:flex-row lg:gap-5"
      buttons={buttons}
    />
  );
};
