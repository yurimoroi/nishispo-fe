import { prefectureValues } from "@/lib";
import { RegisterFormStore } from "./store";
import { getPrefectureIdByLabel } from "@/lib/utils";

/**
 * YubinBango is a library for handling Japanese postal codes.
 * Core is the main class for processing postal codes and returning address data.
 * Yubibango is included via a script tag in the head of the document.
 */
export declare const YubinBango: {
  Core: new (
    value: string,
    callback: (address: {
      k: string; // Prefecture (都道府県)
      region: string; // Region (地区)
      l: string; // Locality (市区町村)
      m: string; // Street (町域)
      o: string; // Organization (組織)
    }) => void,
  ) => void;
};

export const transformUserDataToFormData = (
  formValues: RegisterFormStore["formValues"],
  isEditMode = false,
) => {
  const { uploadFile, affiliateClubs } = formValues;

  const contributorStatus =
    formValues.contributorStatus || (formValues.advertiserName ? "1" : "0");

  const prefecture: string = isNaN(Number(formValues.prefecture ?? ""))
    ? (getPrefectureIdByLabel(formValues.prefecture ?? "") ?? "")
    : String(Number(formValues.prefecture));

  const formDataMapping = {
    family_name: formValues.lastName,
    given_name: formValues.firstName,
    phonetic_family_name: formValues.lastNamePhonetic,
    phonetic_given_name: formValues.firstNamePhonetic,
    birth_date: formValues.dateOfBirth.replaceAll("/", "-"),
    gender_type: formValues.gender,

    postal_code: formValues.postCode,
    province: prefecture,
    address_1: formValues.addressOne,
    address_2: formValues.addressTwo,
    address_3: formValues.addressThree,
    phone_number: formValues.phoneNumber,
    mobile_phone_number: formValues.mobilePhoneNumber,

    email: formValues.email,
    login_id: formValues.username,
    nickname: formValues.nickname,
    favorite_sport: formValues.favoriteSport,
    favorite_gourmet: formValues.favoriteGourmet,

    contributor_status: String(contributorStatus),
    contributor_name: formValues.advertiserName,
    rakuten_id: formValues.rakutenId,

    advertiser_flg: formValues.isAdvertiser ? "1" : "0",
    advertiser_name: formValues.advertiserName,

    line_id: formValues.line_id,
    x_id: formValues.x_id,
    facebook_id: formValues.facebook_id,
    instagram_id: formValues.instagram_id,
  };

  const formData = new FormData();

  Object.entries(formDataMapping).forEach(([key, value]) => {
    formData.append(key, value ? String(value) : "");
  });

  // avatar
  if (uploadFile instanceof File && uploadFile.size > 0) {
    formData.append("avatar", uploadFile);
  }
  // affiliate clubs
  affiliateClubs.forEach((club, index) => {
    formData.append(`affiliate_id[${index}]`, club.id);
  });
  // password
  if (!isEditMode) {
    formData.append("password", formValues.password);
    formData.append("password_confirmation", formValues.confirmPassword);
  }

  if (isEditMode) {
    formData.append("_method", "PUT");
  }

  return formData;
};

export const convertFullWidthToHalfWidth = (value: string) => {
  return value
    .replace(/[\uff01-\uff5e]/g, (fullWidthChar) =>
      String.fromCharCode(fullWidthChar.charCodeAt(0) - 0xfee0),
    )
    .replace(/\u3000/g, "\u0020");
};

export const reformatPostCode = (postCode: string) => {
  const halfWidthPostCode = convertFullWidthToHalfWidth(postCode);
  const extractedNumbers = halfWidthPostCode.replace(/\D/g, "");

  return extractedNumbers;
};

export const getMatchingYubinBangoPrefectureId = (prefecture: string) => {
  return prefectureValues.find((item) => item.label === prefecture)?.id;
};

export const reformatPhoneNumber = (phoneNumber: string) => {
  const halfWidthPhoneNumber = convertFullWidthToHalfWidth(phoneNumber);
  const extractedNumbers = halfWidthPhoneNumber.replace(/\D/g, "");

  return extractedNumbers;
};

export const getAddressByPostcode = (
  postcode: string,
): Promise<{
  formattedAddress: string;
  prefecture: string;
  municipality: string;
  street: string;
} | null> => {
  if (!YubinBango) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    new YubinBango.Core(postcode, (address) => {
      const { region, l, m, o } = address;
      const formattedAddress = `${region}${l}${m}${o}`;
      const prefecture = region;
      const municipality = l;
      const street = m;

      resolve({
        formattedAddress,
        prefecture,
        municipality,
        street,
      });
    });
  });
};
