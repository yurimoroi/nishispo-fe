"use client";

import { useImagePreview } from "@/components/registration/lib/useImagePreview";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { getConvertedSingleLinkToFile } from "@/lib/utils";
import {
  FieldBlock,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
} from "@components/feature/common/label-field-block";
import {
  FieldGenericInput,
  FieldGenericTextArea,
  FormImagePreviewSingle,
  FormImagePreviewSingleBlock,
} from "@components/feature/form";
import { FieldGenericFileImage } from "@components/feature/form/field-generic-file";
import { Button } from "@components/ui//button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { UsersListSelection } from "../accounts/users/users-list-selection";
import {
  OrganizationsDetail,
  transformOrgDataToFormData,
  viewingFlags,
} from "./lib";
import { createNewOrganization, updatedOrganization } from "./lib/actions";
import { formOrganizationSchema } from "./lib/form-schema";

interface Props {
  org?: OrganizationsDetail;
}

export const FormCreateEditOrganization = ({ org }: Props) => {
  const [isClicked, setClicked] = useState(false);
  const [members, setMembers] = useState<string[]>(
    org?.user_administrators.map((member) => member.id) || [],
  );
  const [emailIsInUsed, setEmailIsInUsed] = useState(false);
  const router = useRouter();
  const listPageUrl = "/admin/organizations";
  const isEditMode = Boolean(org);
  const form = useForm<z.infer<typeof formOrganizationSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(formOrganizationSchema),
    defaultValues: {
      representativeName: org?.representative_name || "",
      telNumber: org?.tel_number || "",
      email: org?.email || "",
      uploadFile: new File([], ""),
      name: org?.name || "",
      activityDescription: org?.activity_description || "",
      birthyearViewingFlg: org?.birthyear_viewing_flg === 1 ? 1 : 0,
      birthdateViewingFlg: org?.birthdate_viewing_flg === 1 ? 1 : 0,
      postalCodeViewingFlg: org?.postal_code_viewing_flg === 1 ? 1 : 0,
      addressViewingFlg: org?.address_viewing_flg === 1 ? 1 : 0,
      phoneNumberViewingFlg: org?.phone_number_viewing_flg === 1 ? 1 : 0,
      mobilePhoneNumberViewingFlg:
        org?.mobile_phone_number_viewing_flg === 1 ? 1 : 0,
      emailViewingFlg: org?.email_viewing_flg === 1 ? 1 : 0,
      selectedMembers: members,
    },
  });

  const { imagePreviewSource, onChangeFile, imagePreviewFileName } =
    useImagePreview({ imagePath: org?.logo });

  // On edit mode, when the images arrive, update the input
  useEffect(() => {
    const fetchData = async () => {
      // Check if there's a logo URL
      if (org?.logo) {
        try {
          // Convert the logo URL to a File object
          const file = await getConvertedSingleLinkToFile(org?.logo);

          if (file) {
            // Update the form's "uploadFile" field with the retrieved file
            form.setValue("uploadFile", file);
          }
        } catch (error) {
          console.error("Error fetching the logo file:", error);
        }
      }
    };

    fetchData();
  }, [org?.logo, form]);

  const onSubmit = async (values: z.infer<typeof formOrganizationSchema>) => {
    const combinedData = {
      ...values,
      members: members,
      uploadFileName: imagePreviewFileName,
      uploadFileURL: imagePreviewSource,
    };

    const transformData = transformOrgDataToFormData(combinedData, isEditMode);
    const pathRedirect = listPageUrl;

    try {
      setClicked(true);
      let response;

      if (isEditMode) {
        response = await updatedOrganization(transformData, org?.id!);
      } else {
        response = await createNewOrganization(transformData);
      }
      if (response?.success) {
        router.replace(pathRedirect);
        router.refresh();
      } else {
        if (response?.errors?.email) {
          setEmailIsInUsed(true);
          form.setFocus("email");
        } else {
          setEmailIsInUsed(false);
        }
      }
      setClicked(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "Error during creating organization",
        description: errorMessage,
      });
      setClicked(false);
    }
  };

  const handleBackToMenu = () => {
    router.push(listPageUrl);
  };

  useEffect(() => {
    form.setValue("selectedMembers", members);
  }, [members, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative max-h-fit overflow-hidden"
      >
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock className="text-base">組織ロゴ画像</LabelBlock>
          <FieldBlock>
            <FormImagePreviewSingleBlock>
              <FormImagePreviewSingle
                imageSource={imagePreviewSource}
                imageAlt="preview image"
              />
              <FieldGenericFileImage
                formHook={form}
                formInputName="uploadFile"
                labelText="ファイルを選択"
                handleFileChange={onChangeFile}
              />
            </FormImagePreviewSingleBlock>
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base">組織名</span> <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="name"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base">代表者名 </span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="representativeName"
              labelText=""
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base">連絡先電話番号</span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="telNumber"
              labelText=""
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                const cleanedValue = e.target.value.replace(/-/g, "");
                form.setValue("telNumber", cleanedValue, {
                  shouldValidate: true,
                });
              }}
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock>
            <span className="text-base">連絡先メールアドレス</span>
            <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="email"
              labelText=""
            />
            {emailIsInUsed && (
              <p className="mt-2 font-open text-sm text-red">
                既に登録されているメールアドレスです
              </p>
            )}
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock className="!mb-5 lg:!mb-[.125rem]">
          <LabelBlock className="text-base">活動内容など</LabelBlock>
          <FieldBlock>
            <FieldGenericTextArea
              formHook={form}
              formInputName="activityDescription"
              labelText=""
              textAreaClassName="h-[4.375rem]"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <h2 className="pb-5 pt-[2.5rem] text-base font-bold lg:pt-5">
          組織管理者選択
        </h2>
        <UsersListSelection
          currentMembers={org?.user_administrators || []}
          members={members}
          setMembers={setMembers}
        />

        <Controller
          name="selectedMembers"
          control={form.control}
          render={({ field }) => (
            <input {...field} type="hidden" value={members} />
          )}
        />
        {form.formState.errors.selectedMembers && (
          <p className="mt-1 pb-4 text-sm text-red">
            {form.formState.errors.selectedMembers.message}
          </p>
        )}
        <div className="hidden">
          <h2 className="pb-5 text-base font-bold">個人情報表示範囲の設定</h2>
          <div className="border-[.125rem] border-shade-400 pt-[.625rem]">
            <ul className="grid grid-cols-2 flex-wrap gap-5 p-5 lg:flex">
              {viewingFlags.map((field) => (
                <li key={field.name} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={formField.value === 1}
                              onCheckedChange={(checked) => {
                                formField.onChange(checked ? 1 : 0);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            {field.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5r mb-14 mt-5 block justify-center md:mt-0 md:flex md:flex-row md:gap-5 md:pb-10 md:pt-10 lg:mb-0">
          <Button
            type="button"
            variant="secondary"
            onClick={handleBackToMenu}
            className="mb-5 w-full text-base md:mb-0 md:w-auto"
          >
            戻る
          </Button>
          <Button
            disabled={isClicked}
            className="w-full text-base md:w-auto"
            type="submit"
          >
            登録
          </Button>
        </div>
      </form>
    </Form>
  );
};
