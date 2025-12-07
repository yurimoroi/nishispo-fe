"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "./lib/form-schema";
import { z } from "zod";
import { Form } from "../ui/form";
import {
  FieldGenericCheckbox,
  FieldGenericDate,
  FieldGenericInput,
  FieldGenericTextArea,
  FormImagePreviewSingleBlock,
  FormImagePreviewSingle,
} from "@components/feature/form";
import { Button } from "../ui/button";
import {
  FieldBlock,
  FieldLabelSeparator,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
  LabelHint,
  LabelWithHint,
} from "../feature/common/label-field-block";
import { FieldGenericSelect } from "../feature/form/field-generic-select";
import { genderValues, prefectureValues } from "@/lib/dropdown-values";
import { OrganizationDataType } from "./lib/types";
import { FieldGenericFileImage } from "../feature/form/field-generic-file";
import { useImagePreview } from "./lib/useImagePreview";
import {
  resetRegisterFormValues,
  setRegisterFormValues,
  useRegisterFromStore,
} from "./lib/store";
import { useGetProvisionalData } from "@feature/modal/modal-provisional-login";
import { useEffect, useState } from "react";
import { UserDetailType } from "../mypage";
import {
  getConvertedSingleLinkToFile,
  getPrefectureLabelById,
} from "@/lib/utils";
import {
  ModalOrgList,
  OrgBadges,
  OrgList,
  OrgBadgeBlock,
  OrgBadgeDeleteButton,
  OrgBadgeLabel,
} from "./modal-org-picker";
import { useOrgList } from "./lib/useOrgList";
import { SocialProvider } from "../social/lib/types";
import {
  getAddressByPostcode,
  getMatchingYubinBangoPrefectureId,
  reformatPhoneNumber,
  reformatPostCode,
  useFormRegister,
} from "./lib";

type FormRegisterProps = {
  organizations?: OrganizationDataType[];
  isEditMode?: boolean;
  info?: UserDetailType;
};

export const FormRegister = ({
  organizations = [],
  isEditMode = false,
  info,
}: FormRegisterProps) => {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const desiredUsername = searchParams.get("username");
  const storedValues = useRegisterFromStore.getState().formValues;
  const { provisionalLoginData } = useGetProvisionalData();
  // Placeholder password on edit mode, to bypass checking,
  // We won't pass this value on final step
  const trickPasswordForEdit = "TrickPassword@123";

  const form = useForm<z.infer<typeof registerFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      lastName: info?.family_name || storedValues.lastName,
      firstName: info?.given_name || storedValues.firstName,
      lastNamePhonetic:
        info?.phonetic_family_name || storedValues.lastNamePhonetic,
      firstNamePhonetic:
        info?.phonetic_given_name || storedValues.firstNamePhonetic,
      dateOfBirth:
        info?.birth_date?.replaceAll("-", "/") || storedValues.dateOfBirth,
      gender: info?.gender.status?.toString() || storedValues.gender,
      postCode: info?.postal_code || storedValues.postCode,
      prefecture: info?.province?.toString() || storedValues.prefecture,
      addressOne: info?.address_1 || storedValues.addressOne,
      addressTwo: info?.address_2 || storedValues.addressTwo,
      addressThree: info?.address_3 || storedValues.addressThree,
      mobilePhoneNumber:
        info?.mobile_phone_number || storedValues.mobilePhoneNumber,
      phoneNumber: info?.phone_number || storedValues.phoneNumber,
      email: info?.email || storedValues.email,
      username: desiredUsername || info?.login_id || storedValues.username,
      password: isEditMode ? trickPasswordForEdit : storedValues.password || "",
      confirmPassword: isEditMode
        ? trickPasswordForEdit
        : storedValues.confirmPassword || "",

      uploadFile:
        storedValues.uploadFile instanceof File
          ? storedValues.uploadFile
          : new File([], ""),
      nickname: info?.nickname || storedValues.nickname,
      favoriteSport: info?.favorite_sport || storedValues.favoriteSport,
      favoriteGourmet: info?.favorite_gourmet || storedValues.favoriteGourmet,
      affiliateClubs: storedValues.affiliateClubs,

      contributorFlag:
        storedValues.contributorFlag ||
        (info?.contributor ? info?.contributor?.status > 0 : false),
      advertiserName: info?.contributor_name || storedValues.advertiserName,
      rakutenId: info?.rakuten_id || storedValues.rakutenId,
    },
  });

  // Extract some Logic
  const {
    isShowContributorCheckbox,
    contributorStatus,
    isShowMobileNumberBadge,
    isShowHouseNumberBadge,
    handleEnterKeySubmit,
  } = useFormRegister({
    form,
    isEditMode,
    info,
  });

  // image
  const { imagePreviewSource, onChangeFile, imagePreviewFileName } =
    useImagePreview({
      imagePath: storedValues.uploadFileURL || info?.avatar,
    });
  // org picker
  const {
    isModalOpen,
    setIsModalOpen,
    selectedOrganizations,
    setSelectedOrganizations,
    handleRemoveOrganization,
  } = useOrgList({
    organizationList: organizations,
    initialSelectedOrganizations:
      info?.affiliate || storedValues.affiliateClubs,
    formHook: form,
    formInputName: "affiliateClubs",
  });

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    // Get social media data if there are any
    const socialProvider = searchParams.get("provider");
    const providerId = searchParams.get("id") || "";

    let updatedValues: any = {
      ...values,
      uploadFileName: imagePreviewFileName,
      uploadFileURL: imagePreviewSource,
      prefecture: getPrefectureLabelById(values.prefecture),
    };

    // Only add social media data if on create mode
    if (!isEditMode) {
      updatedValues.x_id =
        socialProvider === SocialProvider.TwitterX ? providerId : "";
      updatedValues.line_id =
        socialProvider === SocialProvider.Line ? providerId : "";
      updatedValues.facebook_id =
        socialProvider === SocialProvider.Facebook ? providerId : "";
      updatedValues.instagram_id =
        socialProvider === SocialProvider.Instagram ? providerId : "";
    }
    // Pass in current contributor status
    updatedValues.contributorStatus = contributorStatus;
    // For preview - update store
    setRegisterFormValues(updatedValues);

    if (isEditMode) {
      router.push("/users/confirm");
    } else {
      router.push("/register/confirm");
    }
  };

  const handleBackToMenu = () => {
    resetRegisterFormValues();
    if (isEditMode) {
      router.push("/mypage");
    } else {
      router.push("/register/menu");
    }
  };

  // Handle when there is Provisional Login from cookie
  useEffect(() => {
    if (storedValues.gender === "0") {
      form.setValue(
        "gender",
        info?.gender?.status?.toString() || provisionalLoginData.gender,
      );
    }
    if (storedValues.favoriteSport === "") {
      form.setValue(
        "favoriteSport",
        info?.favorite_sport || provisionalLoginData.favoriteSport,
      );
    }
    if (storedValues.favoriteGourmet === "") {
      form.setValue(
        "favoriteGourmet",
        info?.favorite_gourmet || provisionalLoginData.favoriteGourmet,
      );
    }
  }, [
    provisionalLoginData,
    storedValues,
    form,
    info?.gender?.status,
    info?.favorite_gourmet,
    info?.favorite_sport,
  ]);

  // On edit mode, when the images arrive, update the input
  useEffect(() => {
    const fetchData = async () => {
      // Sending the images from a server component causes plain object error, so we opt in using useEffect
      if (info?.avatar) {
        const file = await getConvertedSingleLinkToFile(info?.avatar);
        form.setValue("uploadFile", file);
      }
    };

    fetchData();
  }, [info?.avatar, form]);

  // On edit mode, we need to store the current login id to bypass the login in unique check
  useEffect(() => {
    useRegisterFromStore.setState({
      currentLoginId: info?.login_id,
    });
  }, [info?.login_id]);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=""
        onKeyDown={handleEnterKeySubmit}
      >
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            姓 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="lastName"
              labelText=""
              placeholder="姓"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            名 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="firstName"
              labelText=""
              placeholder="名"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            姓（かな） <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="lastNamePhonetic"
              labelText=""
              placeholder="姓（かな）"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            名（かな） <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="firstNamePhonetic"
              labelText=""
              placeholder="名（かな）"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock className="mb-2.5">
            生年月日 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericDate
              formHook={form}
              formInputName="dateOfBirth"
              labelText=""
              currentValue={form.getValues("dateOfBirth")}
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock className="mb-2.5">性別</LabelBlock>
          <FieldBlock>
            {/* Keeping radio buttons codes as reference */}
            {/* <FieldGenericRadioGroup
              formHook={form}
              formInputName="gender"
              labelText=""
              radioValues={genderValues}
              isHorizontal={true}
            /> */}
            <FieldGenericSelect
              formHook={form}
              formInputName="gender"
              labelText=""
              dropdownValues={genderValues}
            />
          </FieldBlock>
        </LabelFieldBlock>

        <FieldLabelSeparator />

        <LabelFieldBlock variant="compact">
          <LabelBlock>
            郵便番号 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <LabelHint>ハイフン不要</LabelHint>
            <FieldGenericInput
              formHook={form}
              formInputName="postCode"
              labelText=""
              placeholder="郵便番号"
              onBlur={async () => {
                const postCode = reformatPostCode(form.getValues("postCode"));
                const {
                  prefecture = "",
                  municipality = "",
                  street = "",
                } = (await getAddressByPostcode(postCode)) || {};
                const prefectureId =
                  getMatchingYubinBangoPrefectureId(prefecture);
                form.setValue("postCode", postCode, { shouldValidate: true });
                form.setValue("prefecture", prefectureId?.toString() || "");
                form.setValue("addressOne", municipality);
                form.setValue("addressTwo", street);
              }}
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            都道府県 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericSelect
              formHook={form}
              formInputName="prefecture"
              labelText=""
              dropdownValues={prefectureValues}
              selectPlaceholder="都道府県"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            市区町村 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="addressOne"
              labelText=""
              placeholder="住所1（市区町村）"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            番地 <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="addressTwo"
              labelText=""
              placeholder="住所2（番地）"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>建物・部屋番号</LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="addressThree"
              labelText=""
              placeholder="住所3（建物）"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            <LabelWithHint label="携帯電話番号" hint="ハイフンなし" />
            {isShowMobileNumberBadge && <LabelBadge />}
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="mobilePhoneNumber"
              labelText=""
              placeholder="携帯電話番号"
              onChange={(value) => {
                form.clearErrors("phoneNumber");
                // Keep the validation value up to date
                form.setValue("mobilePhoneNumber", value, {
                  shouldValidate: true,
                });
              }}
              onBlur={() => {
                const mobilePhoneNumber = reformatPhoneNumber(
                  form.getValues("mobilePhoneNumber"),
                );
                form.setValue("mobilePhoneNumber", mobilePhoneNumber, {
                  shouldValidate: true,
                });
              }}
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            <LabelWithHint label="自宅電話番号" hint="ハイフンなし" />
            {isShowHouseNumberBadge && <LabelBadge />}
          </LabelBlock>
          <FieldBlock>
            <LabelHint>
              携帯電話をお持ちでない方は自宅電話番号を必ずご入力ください（ご本人確認時に必要）
            </LabelHint>
            <FieldGenericInput
              formHook={form}
              formInputName="phoneNumber"
              labelText=""
              placeholder="自宅電話番号"
              onChange={(value) => {
                form.clearErrors("mobilePhoneNumber");
                // Keep the validation value up to date
                form.setValue("phoneNumber", value, {
                  shouldValidate: true,
                });
              }}
              onBlur={() => {
                const phoneNumber = reformatPhoneNumber(
                  form.getValues("phoneNumber"),
                );
                form.setValue("phoneNumber", phoneNumber, {
                  shouldValidate: true,
                });
              }}
            />
          </FieldBlock>
        </LabelFieldBlock>

        <FieldLabelSeparator />

        <LabelFieldBlock variant="compact">
          <LabelBlock>
            メールアドレス <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="email"
              labelText=""
              placeholder="メールアドレス"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>
            ログインID <LabelBadge />
          </LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="username"
              labelText=""
              isShowMultipleErrors={true}
              placeholder="ログインID"
            />
          </FieldBlock>
        </LabelFieldBlock>

        {/* Only show  password fields if not editing - password change have its own page */}
        {isEditMode === false && (
          <>
            <LabelFieldBlock variant="compact">
              <LabelBlock>
                パスワード <LabelBadge />
              </LabelBlock>
              <FieldBlock>
                <LabelHint>
                  パスワードは大文字含む英数字12桁以上で入力してください
                </LabelHint>
                <FieldGenericInput
                  formHook={form}
                  formInputName="password"
                  labelText=""
                  isPasswordField={true}
                  placeholder="パスワード"
                />
              </FieldBlock>
            </LabelFieldBlock>
            <LabelFieldBlock variant="compact">
              <LabelBlock>
                パスワード（確認） <LabelBadge />
              </LabelBlock>
              <FieldBlock>
                <FieldGenericInput
                  formHook={form}
                  formInputName="confirmPassword"
                  labelText=""
                  isPasswordField={true}
                  placeholder="パスワード（再入力）"
                />
              </FieldBlock>
            </LabelFieldBlock>
          </>
        )}

        <FieldLabelSeparator />

        <LabelFieldBlock variant="compact">
          <LabelBlock>プロフィール画像</LabelBlock>
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
        <LabelFieldBlock variant="compact">
          <LabelBlock>ニックネーム</LabelBlock>
          <FieldBlock>
            <FieldGenericInput
              formHook={form}
              formInputName="nickname"
              labelText=""
              placeholder="ニックネーム"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>好きなスポーツ</LabelBlock>
          <FieldBlock>
            <FieldGenericTextArea
              formHook={form}
              formInputName="favoriteSport"
              labelText=""
              textAreaClassName="h-[4.375rem]"
              placeholder="好きなスポーツ"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>好きなグルメ</LabelBlock>
          <FieldBlock>
            <FieldGenericTextArea
              formHook={form}
              formInputName="favoriteGourmet"
              labelText=""
              textAreaClassName="h-[4.375rem]"
              placeholder="好きなグルメ"
            />
          </FieldBlock>
        </LabelFieldBlock>
        <LabelFieldBlock variant="compact">
          <LabelBlock>所属スポーツクラブ</LabelBlock>
          <FieldBlock>
            <Button
              type="button"
              onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
              className="mb-2.5"
            >
              所属スポーツクラブを選択する
            </Button>
            <OrgBadges>
              {selectedOrganizations.map((org) => (
                <OrgBadgeBlock key={org.id}>
                  <OrgBadgeLabel>{org.name}</OrgBadgeLabel>
                  <OrgBadgeDeleteButton
                    onClick={() => {
                      handleRemoveOrganization(org);
                    }}
                  />
                </OrgBadgeBlock>
              ))}
            </OrgBadges>
            <ModalOrgList
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            >
              <OrgList
                organizationList={organizations}
                initialSelectedOrganizations={selectedOrganizations}
                setIsModalOpen={setIsModalOpen}
                setSelectedOrganizations={setSelectedOrganizations}
              />
            </ModalOrgList>
          </FieldBlock>
        </LabelFieldBlock>

        <FieldLabelSeparator />

        {/* As per client, hide this section when  contributor application is ongoing (status other than 0) */}
        {isShowContributorCheckbox && (
          <LabelFieldBlock variant="compact">
            <LabelBlock>記事投稿者申請</LabelBlock>
            <FieldBlock>
              <FieldGenericCheckbox
                formHook={form}
                formInputName="contributorFlag"
                labelText="記事投稿者として申請します"
                handleChange={() => {
                  form.setValue("advertiserName", "");
                  form.setValue("rakutenId", "");
                }}
              />
            </FieldBlock>
          </LabelFieldBlock>
        )}
        {form.watch("contributorFlag") && (
          <>
            <LabelFieldBlock variant="compact">
              <LabelBlock>
                記事投稿者名 <LabelBadge />
              </LabelBlock>
              <FieldBlock>
                <FieldGenericInput
                  formHook={form}
                  formInputName="advertiserName"
                  labelText=""
                  placeholder="記事投稿者名"
                />
              </FieldBlock>
            </LabelFieldBlock>
            <LabelFieldBlock variant="compact">
              <LabelBlock>楽天ID</LabelBlock>
              <FieldBlock>
                <FieldGenericInput
                  formHook={form}
                  formInputName="rakutenId"
                  labelText=""
                  placeholder="楽天ID"
                />
              </FieldBlock>
            </LabelFieldBlock>
          </>
        )}

        <div className="inline-flex flex-col-reverse justify-center gap-[.75rem] px-[2.6875rem] pb-10 pt-10 lg:flex lg:flex-row lg:gap-[5rem]">
          <Button type="button" variant="secondary" onClick={handleBackToMenu}>
            登録をやめる
          </Button>
          <Button type="submit">登録内容の確認</Button>
        </div>
      </form>
    </Form>
  );
};
