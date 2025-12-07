"use client";

import { useForm } from "react-hook-form";
import {
  articleTemplateFormSchema,
  ArticleTemplateType,
  closeModalArticleTemplate,
  getTemplateByType,
  setModalArticleTemplateAndClose,
} from "./lib";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { removeHTMLTags } from "./lib/utils";

export const FormArticleTemplate = () => {
  const [activeTemplate, setActiveTemplate] =
    useState<ArticleTemplateType>("1");
  const infoText = useRef("");
  const form = useForm<z.infer<typeof articleTemplateFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(articleTemplateFormSchema),
    defaultValues: {
      title: "default title",
      body: "default body",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof articleTemplateFormSchema>,
  ) => {
    const { title, body } = values;
    // Set the store
    setModalArticleTemplateAndClose({
      title: removeHTMLTags(title),
      body: removeHTMLTags(body),
    });
    closeModalArticleTemplate();
  };

  // Handle changes on template selection
  useEffect(() => {
    // Update form values
    const { info, title, body } = getTemplateByType(activeTemplate);

    infoText.current = info;

    form.reset(
      {
        title,
        body,
      },
      {
        keepDirty: true,
        keepTouched: true,
      },
    );
  }, [activeTemplate, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[2rem]">
        <FormArticleTemplateTabs>
          {[1, 2, 3, 4].map((num) => {
            const templateId = String(num) as ArticleTemplateType;
            return (
              <FormArticleTemplateTab
                key={templateId}
                handleClick={() => setActiveTemplate(templateId)}
                isActive={activeTemplate === templateId}
              >
                見本{num}
              </FormArticleTemplateTab>
            );
          })}
        </FormArticleTemplateTabs>

        <div>
          <p className="!mt-0 mb-[2rem] whitespace-pre-line lg:text-xl">
            {infoText.current}
          </p>

          <FormArticleTemplateInfo />
        </div>

        {/* Note: Keeping fields commented out just in case client changes their minds */}
        {/* <FieldGenericTextArea
          formHook={form}
          formInputName="title"
          labelText="記事タイトル"
          textAreaClassName="h-[4.875rem] text-base"
        />
        <FieldGenericTextArea
          formHook={form}
          formInputName="body"
          labelText="記事本文"
          textAreaClassName="h-[21.875rem] text-base"
        /> */}

        <div className="">
          <FormArticleTemplateLabel>記事タイトル</FormArticleTemplateLabel>
          <FormArticleTemplateOutput>
            <div
              dangerouslySetInnerHTML={{ __html: form.watch("title") }}
            ></div>
          </FormArticleTemplateOutput>
        </div>
        <div>
          <FormArticleTemplateLabel>記事本文</FormArticleTemplateLabel>
          <FormArticleTemplateOutput>
            <div dangerouslySetInnerHTML={{ __html: form.watch("body") }}></div>
          </FormArticleTemplateOutput>
        </div>

        <Button variant="secondary">この内容を記事に埋め込む</Button>
      </form>
    </Form>
  );
};

const FormArticleTemplateTabs = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("mb-[2rem] flex gap-0.5", className)}>{children}</div>
  );
};

const FormArticleTemplateTab = ({
  className,
  children,
  handleClick,
  isActive = false,
}: CommonProps & {
  handleClick: () => void;
  isActive?: boolean;
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "w-full rounded-none bg-shade-400 font-noto text-base text-black hover:bg-shade-400 lg:py-2.5",
        className,
        {
          "bg-blue-300 text-white": isActive,
        },
      )}
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </Button>
  );
};

const FormArticleTemplateInfo = () => {
  return (
    <section>
      <p>■特別な表示の使い方</p>
      <p className="mb-5">
        <span className="font-bold">
          見出し・小見出し・太字・リスト・リンク
        </span>
        を使用する場合は、#や*などの半角記号（タグ）を使用して表示されます。記事のテンプレートを参考にして、下記のように、記号と
        <span className="text-red">赤文字部分</span>
        を適宜変更してお使いしてください。
      </p>
      <FormArticleTemplateInfoBlock>
        <FormArticleTemplateInfoTitle>
          ##<span className="text-red">大見出し</span>
        </FormArticleTemplateInfoTitle>
        <p>##は大見出しとして表示されます。</p>
      </FormArticleTemplateInfoBlock>
      <FormArticleTemplateInfoBlock>
        <FormArticleTemplateInfoTitle>
          ###<span className="text-red">中見出し</span>
        </FormArticleTemplateInfoTitle>
        <p>###は中見出しとして表示されます。</p>
      </FormArticleTemplateInfoBlock>
      <FormArticleTemplateInfoBlock>
        <FormArticleTemplateInfoTitle>
          [<span className="text-red">中見出し</span>]
        </FormArticleTemplateInfoTitle>
        <p>[]で囲むと太字で表示されます。</p>
      </FormArticleTemplateInfoBlock>
      <FormArticleTemplateInfoBlock>
        <FormArticleTemplateInfoTitle>
          *<span className="text-red">リスト</span>
        </FormArticleTemplateInfoTitle>
        <p>*と半角スペースの後に文字をつけると、・リストで表示されます</p>
      </FormArticleTemplateInfoBlock>
      <FormArticleTemplateInfoBlock>
        <FormArticleTemplateInfoTitle>
          [<span className="text-red">リンクにしたい文字</span>](URL &apos;
          <span className="text-red">https://miyaspo.chikispo.jp</span>&apos;)
        </FormArticleTemplateInfoTitle>
        <p>
          [テキスト](URL
          &apos;アドレス&apos;)のセットはリンク表示されます。大文字のURLと&apos;
          &apos;の間に半角スペースを入れてから、リンクしたいアドレスは&apos;
          &apos;の間に記入してください。
        </p>
      </FormArticleTemplateInfoBlock>
    </section>
  );
};

const FormArticleTemplateInfoBlock = ({ className, children }: CommonProps) => {
  return <div className={cn("mb-5", className)}>{children}</div>;
};

const FormArticleTemplateInfoTitle = ({ className, children }: CommonProps) => {
  return (
    <p
      className={cn("mb-2.5 border-b-[.0625rem] border-black py-1", className)}
    >
      {children}
    </p>
  );
};

const FormArticleTemplateLabel = ({ className, children }: CommonProps) => {
  return (
    <p className={cn("whitespace-pre-line pb-2 text-base", className)}>
      {children}
    </p>
  );
};

const FormArticleTemplateOutput = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "!mt-0 whitespace-pre-line rounded-[.375rem] border-[.0625rem] border-black p-2.5",
        className,
      )}
    >
      <p>{children}</p>
    </div>
  );
};
