"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postLimitFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FieldGenericSelect } from "@/components/feature/form";
import {
  FieldBlock,
  LabelBlock,
  LabelFieldBlock,
} from "@/components/feature/common";
import { Button } from "@/components/ui/button";
import { CompanyResponseType } from "@/components/feature/footer/lib/types";
import { toast } from "@/hooks/use-toast";
import { updatePostLimit } from "./lib/action";
import { useRouter } from "next/navigation";

const generateDropdownValues = () => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: (index + 1).toString(),
    label: (index + 1).toString(),
  }));
};

type FormPostLimitProps = {
  companyInfo?: CompanyResponseType["data"];
};

export const FormPostLimit = ({ companyInfo }: FormPostLimitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof postLimitFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(postLimitFormSchema),
    defaultValues: {
      orgMemberPostLimit:
        companyInfo?.organization_member_post_limit?.toString() || "",
      orgPostLimit: companyInfo?.organization_post_limit?.toString() || "",
      postLimit: companyInfo?.post_limit?.toString() || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof postLimitFormSchema>) => {
    try {
      setIsLoading(true);

      const response = await updatePostLimit(values);

      if (!response?.success) {
        toast({
          title: "Post Limit Save Warning",
          description: response?.message,
        });
      } else {
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Post Limit Save Error",
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <LabelFieldBlock>
          <LabelBlock className="min-w-[18.75rem] shrink-0">
            スポーツクラブ所属者投稿上限数
          </LabelBlock>
          <FieldBlock className="px-3 text-base">
            <FieldGenericSelect
              formHook={form}
              formInputName="orgMemberPostLimit"
              labelText=""
              dropdownValues={generateDropdownValues()}
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="">
          <LabelBlock className="min-w-[18.75rem] shrink-0">
            一般募集記者投稿上限数
          </LabelBlock>
          <FieldBlock className="px-3 text-base">
            <FieldGenericSelect
              formHook={form}
              formInputName="orgPostLimit"
              labelText=""
              dropdownValues={generateDropdownValues()}
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="">
          <LabelBlock className="min-w-[18.75rem] shrink-0">
            スポーツクラブ単位投稿上限数
          </LabelBlock>
          <FieldBlock className="px-3 text-base">
            <FieldGenericSelect
              formHook={form}
              formInputName="postLimit"
              labelText=""
              dropdownValues={generateDropdownValues()}
            />
          </FieldBlock>
        </LabelFieldBlock>

        <div className="flex justify-center gap-5">
          <Button disabled={isLoading}>更新する</Button>
        </div>
      </form>
    </Form>
  );
};
