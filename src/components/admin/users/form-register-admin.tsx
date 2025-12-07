"use client";

import {
  resetRegisterFormValues,
  setRegisterFormValues,
  useRegisterFromStore,
} from "@/components/registration/lib/store";
import { OrganizationDataType } from "@/components/registration/lib/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerAdminFormSchema } from "./lib";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { getConvertedSingleLinkToFile } from "@/lib/utils";
import {
  FieldBlock,
  LabelBadge,
  LabelBlock,
  LabelFieldBlock,
  LabelHint,
  LabelWithHint,
} from "@/components/feature/common";
import {
  FieldGenericCheckbox,
  FieldGenericDate,
  FieldGenericFileImage,
  FieldGenericInput,
  FieldGenericSelect,
  FieldGenericTextArea,
  FormImagePreviewSingle,
  FormImagePreviewSingleBlock,
} from "@/components/feature/form";
import { genderValues, prefectureValues } from "@/lib/dropdown-values";
import { Button } from "@/components/ui/button";
import {
  ModalOrgList,
  OrgBadgeBlock,
  OrgBadgeDeleteButton,
  OrgBadgeLabel,
  OrgBadges,
  OrgList,
} from "@/components/registration";
import { useImagePreview } from "@/components/registration/lib/useImagePreview";
import { useOrgList } from "@/components/registration/lib/useOrgList";
import { AdminUserDetailType } from "./detail/lib/types";
import {
  getAddressByPostcode,
  getMatchingYubinBangoPrefectureId,
  reformatPhoneNumber,
  reformatPostCode,
  useFormRegister,
} from "@/components/registration/lib";

type FormRegisterAdminProps = {
  organizations?: OrganizationDataType[];
  isEditMode?: boolean;
  info?: AdminUserDetailType;
  userId?: string;
};

export const FormRegisterAdmin = ({
  info,
  isEditMode = false,
  organizations = [],
  userId,
}: FormRegisterAdminProps) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const storedValues = useRegisterFromStore.getState().formValues;
  // Placeholder password on edit mode, to bypass checking,
  // We won't pass this value on final step
  const trickPasswordForEdit = "TrickPassword@123";

  const form = useForm<z.infer<typeof registerAdminFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    resolver: zodResolver(registerAdminFormSchema),
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
      username: info?.login_id || storedValues.username,
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
      isAdvertiser: info?.advertiser_flg
        ? info?.advertiser_flg === 1
        : storedValues.isAdvertiser,
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

  const onSubmit = async (values: z.infer<typeof registerAdminFormSchema>) => {
    const updatedValues = {
      ...values,
      uploadFileName: imagePreviewFileName,
      uploadFileURL: imagePreviewSource,
      id: userId,
      // Pass in current contributor status
      contributorStatus: contributorStatus,
    };

    // For preview - update store
    setRegisterFormValues(updatedValues);

    if (isEditMode) {
      router.push(`/admin/users/${userId}/confirm-create`);
    } else {
      router.push("/admin/users/confirm-create");
    }
  };

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
            <FieldGenericSelect
              formHook={form}
              formInputName="gender"
              labelText=""
              dropdownValues={genderValues}
            />
          </FieldBlock>
        </LabelFieldBlock>

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

        <LabelFieldBlock variant="compact">
          <LabelBlock>広告主アカウントか</LabelBlock>
          <FieldBlock>
            <FieldGenericCheckbox
              formHook={form}
              formInputName="isAdvertiser"
              labelText="広告主アカウント"
            />
          </FieldBlock>
        </LabelFieldBlock>

        <div className="inline-flex flex-col-reverse justify-center gap-[.75rem] px-[2.6875rem] pb-10 pt-10 lg:flex lg:flex-row lg:gap-[5rem]">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              resetRegisterFormValues();
              router.push("/admin/users");
            }}
          >
            登録をやめる
          </Button>
          <Button type="submit">登録内容の確認</Button>
        </div>
      </form>
    </Form>
  );
};
