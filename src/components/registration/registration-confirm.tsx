"use client";

import {
  RegisterFormStore,
  resetRegisterFormValues,
  useRegisterFromStore,
} from "./lib/store";
import {
  FieldLabelSeparator,
  LabelFieldBlockDetailView,
} from "@feature/common/label-field-block";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  FormImagePreviewSingleBlock,
  FormImagePreviewSingle,
} from "../feature/form";
import {
  submitProfileImage,
  submitRegistration,
  updateProfile,
} from "./lib/actions";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { useEffect, useState } from "react";
import { genderValuesLabelMap } from "@/lib/dropdown-values";
import { openModalMessage } from "../feature/modal";
import { MODAL_MESSAGE } from "@/lib/message-map";
import { transformUserDataToFormData } from "./lib";

const getSocialAccountToLinkRegister = (
  formValues: RegisterFormStore["formValues"],
) => {
  const { line_id, x_id, facebook_id, instagram_id } = formValues;
  if (x_id) {
    return "X で登録";
  }

  if (line_id) {
    return "LINE で登録";
  }

  if (facebook_id) {
    return "Facebook で登録";
  }

  if (instagram_id) {
    return "Instagram で登録";
  }

  return "-";
};

export const RegistrationConfirm = () => {
  const [isClient, setIsClient] = useState(false);
  const { formValues } = useRegisterFromStore.getState();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = pathname.startsWith("/user");

  const clearFormAndRedirect = async () => {
    resetRegisterFormValues();
    const title = isEditMode
      ? MODAL_MESSAGE.UPDATE_PROFILE_SUCCESS_TITLE
      : MODAL_MESSAGE.REGISTER_SUCCESS_TITLE;
    const message = isEditMode
      ? MODAL_MESSAGE.UPDATE_PROFILE_SUCCESS_CONTENT
      : MODAL_MESSAGE.REGISTER_SUCCESS_CONTENT;
    const redirectPath = isEditMode ? "/mypage" : "/";
    await router.push(redirectPath);
    setTimeout(() => {
      openModalMessage({
        title,
        message,
      });
    }, 1000);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      let response = null;

      const transformedData = transformUserDataToFormData(
        formValues,
        isEditMode,
      );

      if (!isEditMode) {
        response = await submitRegistration(transformedData);
      } else {
        response = await updateProfile(transformedData);
      }

      if (!response?.success) {
        toast({
          title: "Registration Warning",
          description: formatResponseError(
            response?.errors || response?.message,
          ),
        });
      } else {
        clearFormAndRedirect();
      }
    } catch (error) {
      toast({ title: "Registration Error", description: String(error) });
    } finally {
      setIsLoading(false);
    }
  };

  const firstSection = [
    {
      label: "姓",
      value: formValues.lastName,
    },
    {
      label: "名",
      value: formValues.firstName,
    },
    {
      label: "姓（かな）",
      value: formValues.lastNamePhonetic,
    },
    {
      label: "名（かな）",
      value: formValues.firstNamePhonetic,
    },
    {
      label: "生年月日",
      value: formValues.dateOfBirth,
    },
    {
      label: "性別",
      value: genderValuesLabelMap[Number(formValues.gender)],
    },
  ];

  const secondSection = [
    {
      label: "住所",
      value: `〒${formValues.postCode} ${formValues.prefecture} ${formValues.addressOne} ${formValues.addressTwo} ${formValues.addressThree}`,
    },
    {
      label: "自宅電話番号",
      value: formValues.mobilePhoneNumber || "-",
    },
    {
      label: "携帯電話番号",
      value: formValues.phoneNumber || "-",
    },
  ];

  const thirdSection = [
    {
      label: "メールアドレス",
      value: formValues.email,
    },
    {
      label: "ログインID",
      value: formValues.username,
    },
  ];

  const fourthSection = [
    {
      label: "ニックネーム",
      value: formValues.nickname,
    },
    {
      label: "好きなスポーツ",
      value: formValues.favoriteSport,
    },
    {
      label: "好きなグルメ",
      value: formValues.favoriteGourmet,
    },
  ];

  const fifthSectionConditional = [
    {
      label: "記事投稿者名",
      value: formValues.advertiserName,
    },
    {
      label: "好きなスポーツ",
      value: formValues.rakutenId,
    },
  ];

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section>
      <div>
        {firstSection.map((item, index) => {
          const { label } = item;
          return <LabelFieldBlockDetailView {...item} key={label} />;
        })}
      </div>
      <FieldLabelSeparator className="pb-[.75rem]" />
      <div>
        {secondSection.map((item, index) => {
          const { label } = item;
          return <LabelFieldBlockDetailView {...item} key={label} />;
        })}
      </div>
      <FieldLabelSeparator className="pb-[.75rem]" />
      <div>
        {thirdSection.map((item, index) => {
          const { label } = item;
          return <LabelFieldBlockDetailView {...item} key={label} />;
        })}
        <LabelFieldBlockDetailView
          label="SNSアカウントで登録"
          value={getSocialAccountToLinkRegister(formValues)}
        />
      </div>
      <div>
        <LabelFieldBlockDetailView
          label="プロフィール画像"
          value=""
          child={
            <FormImagePreviewSingleBlock className="justify-center">
              <FormImagePreviewSingle
                imageSource={formValues.uploadFileURL || ""}
                imageAlt="preview image"
              />
            </FormImagePreviewSingleBlock>
          }
        />

        {fourthSection.map((item, index) => {
          const { label, value } = item;
          return <LabelFieldBlockDetailView {...item} key={label} />;
        })}

        <LabelFieldBlockDetailView
          label="プロフィール画像"
          value=""
          child={
            <div className="flex flex-col gap-4">
              {formValues.affiliateClubs.map((club, index) => {
                return <p key={`${index}_${club}`}>{club.name}</p>;
              })}
            </div>
          }
        />
      </div>

      <FieldLabelSeparator className="pb-[.75rem]" />
      <LabelFieldBlockDetailView
        label="記事投稿者申請"
        value={
          formValues.contributorFlag
            ? "記事投稿者として申請します"
            : "記事投稿者として申請しません"
        }
      />

      {formValues.contributorFlag && (
        <div>
          {fifthSectionConditional.map((item, index) => {
            const { label } = item;
            return <LabelFieldBlockDetailView {...item} key={label} />;
          })}
        </div>
      )}

      <div className="inline-flex flex-col-reverse justify-center gap-[.75rem] px-[2.6875rem] pb-10 pt-10 lg:flex lg:flex-row lg:gap-[5rem]">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          登録内容を修正する
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
          登録内容の保存
        </Button>
      </div>
    </section>
  );
};
