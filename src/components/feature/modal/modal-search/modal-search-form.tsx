"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "./lib/form-schema";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FieldGenericInput, FieldGenericDate } from "@/components/feature/form";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { SearchArticleKey } from "./lib/types";
import Image from "next/image";
import IconTilde from "@public/icon-tilde.svg";

type ModalSearchFormProps = {
  handleModalClose: () => void;
};

export const ModalSearchForm = ({ handleModalClose }: ModalSearchFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm: "",
      dateStart: "",
      dateEnd: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchFormSchema>) => {
    // Note: No validation on documentations at the time of this writing.
    const searchParams = new URLSearchParams({
      [SearchArticleKey.SearchTerm]: values.searchTerm,
      [SearchArticleKey.DateStart]: values.dateStart,
      [SearchArticleKey.DateEnd]: values.dateEnd,
    });

    handleModalClose();

    router.push(`/articles/search?${searchParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGenericInput
          formHook={form}
          formInputName="searchTerm"
          labelText="フリーワード検索"
          currentValue={""}
          isModal={true}
        />

        <div className="flex flex-col gap-2.5 md:flex-row">
          <Label className="shrink-0 text-left text-dark-200 md:min-w-[7.5rem]">
            公開日
          </Label>
          <FieldGenericDate
            formHook={form}
            currentValue={null}
            formInputName="dateStart"
            labelText=""
          />
          <Image src={IconTilde} alt="icon-tilde" className="hidden md:block" />
          <FieldGenericDate
            formHook={form}
            currentValue={null}
            formInputName="dateEnd"
            labelText=""
          />
        </div>

        <div className="flex flex-row justify-center gap-5">
          <Button type="submit" size="sm">
            検索
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={handleModalClose}
          >
            閉じる
          </Button>
        </div>
      </form>
    </Form>
  );
};
