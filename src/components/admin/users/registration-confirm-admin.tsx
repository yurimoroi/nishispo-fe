"use client";

import { LabelFieldBlockDetailView } from "@/components/feature/common";
import {
  FormImagePreviewSingle,
  FormImagePreviewSingleBlock,
} from "@/components/feature/form";
import { openModalMessage } from "@/components/feature/modal";
import { transformUserDataToFormData } from "@/components/registration/lib";
import {
  submitRegistration,
  updateProfile,
} from "@/components/registration/lib/actions";
import {
  resetRegisterFormValues,
  useRegisterFromStore,
} from "@/components/registration/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { genderValuesLabelMap } from "@/lib";
import { MODAL_MESSAGE } from "@/lib/message-map";
import { formatResponseError, getConvertedSingleLinkToFile } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateAdminUserProfile } from "./lib/actions";
import { getPrefectureLabel } from "./lib/helper";

export const RegistrationConfirmAdmin = () => {
  const [isClient, setIsClient] = useState(false);
  const { formValues } = useRegisterFromStore.getState();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !pathname.startsWith("/admin/users/confirm-create");

  const clearFormAndRedirect = async (userId: string) => {
    resetRegisterFormValues();
    const title = isEditMode
      ? MODAL_MESSAGE.UPDATE_PROFILE_SUCCESS_TITLE
      : MODAL_MESSAGE.REGISTER_SUCCESS_TITLE;
    const message = isEditMode
      ? MODAL_MESSAGE.UPDATE_PROFILE_SUCCESS_CONTENT
      : MODAL_MESSAGE.REGISTER_SUCCESS_CONTENT;
    // redirect to input
    router.push(`/admin/users`);

    setTimeout(() => {
      openModalMessage({
        title,
        message,
      });
    }, 1000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      let response = null;

      const { formValues } = useRegisterFromStore.getState();

      const transformedData = transformUserDataToFormData(
        formValues,
        isEditMode,
      );

      if (!isEditMode) {
        response = await submitRegistration(transformedData);
      } else {
        response = await updateAdminUserProfile(
          transformedData,
          formValues?.id || "",
        );
      }
      if (!response?.success) {
        toast({
          title: "Registration Warning",
          description: formatResponseError(
            response?.errors || response?.message,
          ),
        });
      } else {
        // clear the store
        clearFormAndRedirect(response?.data?.id);
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: String(error),
      });
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
      value: `〒${formValues.postCode} ${getPrefectureLabel(formValues.prefecture)} ${formValues.addressOne} ${formValues.addressTwo} ${formValues.addressThree}`,
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
      label: "好きなスポーツ",
      value: formValues.favoriteSport,
    },
    {
      label: "好きなグルメ",
      value: formValues.favoriteGourmet,
    },
  ];

  const fourthSection = [
    {
      label: "ログインID",
      value: formValues.username,
    },
    {
      label: "メールアドレス",
      value: formValues.email,
    },
  ];

  const fifthSection = [
    {
      label: "ニックネーム",
      value: formValues.nickname,
    },
    {
      label: "記事投稿者申請",
      value: formValues.contributorFlag ? "Applied" : "-",
    },
    {
      label: "記事投稿者名",
      value: formValues.advertiserName,
    },
    {
      label: "好きなスポーツ",
      value: formValues.rakutenId,
    },
    {
      label: "広告主アカウントか  ",
      value: formValues.isAdvertiser ? "広告主" : "-",
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
      <div>
        {secondSection.map((item, index) => {
          const { label } = item;
          return <LabelFieldBlockDetailView {...item} key={label} />;
        })}
      </div>
      <div>
        {thirdSection.map((item, index) => {
          const { label } = item;
          return <LabelFieldBlockDetailView {...item} key={label} />;
        })}
      </div>
      <div>
        {fourthSection.map((item, index) => {
          const { label } = item;
          return <LabelFieldBlockDetailView {...item} key={label} />;
        })}
      </div>

      <div>
        <LabelFieldBlockDetailView
          label="所属スポーツクラブ"
          value=""
          child={
            formValues.affiliateClubs.length === 0 ? (
              "-"
            ) : (
              <div className="flex flex-col gap-4">
                {formValues.affiliateClubs.map((club, index) => {
                  return <p key={`${index}_${club}`}>{club.name}</p>;
                })}
              </div>
            )
          }
        />
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
      </div>
      <div>
        {fifthSection.map((item, index) => {
          const { label } = item;
          return <LabelFieldBlockDetailView {...item} key={label} />;
        })}
      </div>

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
