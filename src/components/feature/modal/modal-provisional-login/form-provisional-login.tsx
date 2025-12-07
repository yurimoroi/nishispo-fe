"use client";

import { useForm } from "react-hook-form";
import { provisionalLoginFormSchema } from "./lib/form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGenericInput, FieldGenericSelect } from "@feature/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMemo, useState } from "react";
import { getYearsOfBirth } from "./lib/utils";
import { genderValues } from "@/lib/dropdown-values";
import { setProvisionalLoginData } from "./lib/actions";
import { toast } from "@/hooks/use-toast";

type FormProvisionalLoginProps = {
  handleModalClose: () => void;
};

export const FormProvisionalLogin = ({
  handleModalClose,
}: FormProvisionalLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof provisionalLoginFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(provisionalLoginFormSchema),
    defaultValues: {
      yearOfBirth: "2000",
      gender: "0", // 0 is "No Answer"
      favoriteSport: "",
      favoriteGourmet: "",
    },
  });
  const yearsOfBirth = useMemo(() => getYearsOfBirth(), []);

  const onSubmit = async (
    values: z.infer<typeof provisionalLoginFormSchema>,
  ) => {
    try {
      setIsLoading(true);

      await setProvisionalLoginData(JSON.stringify(values));
      handleModalClose();
    } catch (error) {
      toast({
        title: "Provisional Login Save Warning",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGenericSelect
          formHook={form}
          formInputName="yearOfBirth"
          labelText="生まれた年"
          isModal={true}
          dropdownValues={yearsOfBirth}
          formItemClassName="flex lg:flex-row flex-col items-baseline gap-[.625rem]"
          formLabelClassName="w-[7.5rem]"
        />
        <FieldGenericSelect
          formHook={form}
          formInputName="gender"
          labelText="性別"
          isModal={true}
          dropdownValues={genderValues}
          formItemClassName="flex lg:flex-row flex-col items-baseline gap-[.625rem]"
          formLabelClassName="w-[7.5rem]"
        />
        <FieldGenericInput
          formHook={form}
          formInputName="favoriteSport"
          labelText="好きなスポーツ"
          isModal={true}
          formItemClassName="flex-col lg:flex-row items-baseline"
          formLabelClassName="w-[7.5rem]"
        />
        <FieldGenericInput
          formHook={form}
          formInputName="favoriteGourmet"
          labelText="好きなグルメ"
          isModal={true}
          formItemClassName="flex-col lg:flex-row items-baseline"
          formLabelClassName="w-[7.5rem]"
        />
        <div className="flex justify-center gap-5">
          <Button disabled={isLoading}>送信する</Button>
          <Button
            disabled={isLoading}
            type="button"
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


