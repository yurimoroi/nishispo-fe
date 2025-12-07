import { ExtendedAccount, OrganizationFormFieldsType } from "./types";

export const transformOrgDataToFormData = (
  formValues: OrganizationFormFieldsType,
  isEditMode = false,
) => {
  const formDataMapping = {
    name: formValues.name,
    representative_name: formValues.representativeName,
    tel_number: formValues.telNumber,
    email: formValues.email,
    activity_description: formValues.activityDescription,
    birthyear_viewing_flg: formValues.birthyearViewingFlg,
    birthdate_viewing_flg: formValues.birthdateViewingFlg,
    postal_code_viewing_flg: formValues.postalCodeViewingFlg,
    address_viewing_flg: formValues.addressViewingFlg,
    phone_number_viewing_flg: formValues.phoneNumberViewingFlg,
    mobile_phone_number_viewing_flg: formValues.mobilePhoneNumberViewingFlg,
    email_viewing_flg: formValues.emailViewingFlg,
    logo: formValues.uploadFile,
  };
  const formData = new FormData();

  Object.entries(formDataMapping).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  formValues.members.forEach((usersId, index) => {
    formData.append(`user_administrators[${index}]`, usersId);
  });

  if (isEditMode) {
    formData.append("_method", "PUT");
  }

  return formData;
};

export const removeDuplicateById = (
  accounts: ExtendedAccount[],
): ExtendedAccount[] => {
  return accounts.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id), // Ensure uniqueness based on id
  );
};

export const viewingFlags = [
  { name: "birthyearViewingFlg", label: "生年" },
  { name: "birthdateViewingFlg", label: "誕生日" },
  { name: "postalCodeViewingFlg", label: "郵便番号" },
  { name: "addressViewingFlg", label: "住所" },
  { name: "phoneNumberViewingFlg", label: "自宅電話番号" },
  { name: "mobilePhoneNumberViewingFlg", label: "携帯電話番号" },
  { name: "emailViewingFlg", label: "メールアドレス" },
] as const;
