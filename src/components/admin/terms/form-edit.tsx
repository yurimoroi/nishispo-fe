"use client";
import { toast } from "@/hooks/use-toast";
import { FieldBlock, LabelFieldBlock } from "@/components/feature/common";
import { FieldGenericTextArea } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { termsFormSchema } from "./lib/form-schema";
import { setCompanyData } from "@/components/feature/footer/lib/actions";

interface Props {
  currentContent: string;
}

export const FormEdit = ({ currentContent }: Props) => {
  const [isClicked, setClicked] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof termsFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(termsFormSchema),
    defaultValues: {
      content: `${currentContent}`,
    },
  });

  const onSubmit = async (formData: z.infer<typeof termsFormSchema>) => {
    const column = "terms";
    const pathRedirect = "/admin/terms";
    try {
      setClicked(true);
      const response = await setCompanyData(column, formData);
      if (response.success) {
        router.replace(pathRedirect);
        router.refresh();
      }
      setClicked(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "Error during saving the content",
        description: errorMessage,
      });
      setClicked(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <LabelFieldBlock>
            <FieldBlock className="lg:p-0">
              <FieldGenericTextArea
                formHook={form}
                formInputName="content"
                labelText=""
                textAreaClassName="min-h-[60vh]"
              />
            </FieldBlock>
          </LabelFieldBlock>

          <div className="justify-center gap-5 pt-2 text-center md:flex">
            <Button
              variant="dull"
              className="mb-5 flex w-full shadow-button md:mb-0 md:inline-flex md:w-auto"
              onClick={() => router.back()}
            >
              戻る
            </Button>
            <Button
              disabled={isClicked}
              type="submit"
              className="flex w-full md:inline-flex md:w-auto"
            >
              保存
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
