import { AccountsType } from "../../accounts/lib";

export interface OrganizationsResponseType {
  success: boolean;
  message: string;
  data: OrganizationsData;
}

export interface OrganizationsData {
  current_page: number;
  data: OrganizationsType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
  links: Link[];
}

export interface OrganizationsType {
  id: string;
  name: string;
  representative_name: string;
  tel_number: string;
  email: string;
  activity_description: string;
  birthyear_viewing_flg: number;
  birthdate_viewing_flg: number;
  postal_code_viewing_flg: number;
  address_viewing_flg: number;
  phone_number_viewing_flg: number;
  mobile_phone_number_viewing_flg: number;
  email_viewing_flg: number;
  logo: string;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
export interface OrganizationsDetailsResponseType {
  success: boolean;
  message: string;
  data: OrganizationsDetail;
  errors?: Record<string, string[]>;
}

export interface OrganizationsDetail {
  id: string;
  name: string;
  representative_name: string;
  tel_number: string;
  email: string;
  activity_description: string;
  birthyear_viewing_flg: number;
  birthdate_viewing_flg: number;
  postal_code_viewing_flg: number;
  address_viewing_flg: number;
  phone_number_viewing_flg: number;
  mobile_phone_number_viewing_flg: number;
  email_viewing_flg: number;
  logo: string;
  user_administrators: any[];
}

export interface OrganizationFormDataType {
  name: string;
  representative_name: string;
  activity_description: string;
  tel_number: string;
  email: string;
  uploadFile?: File | null;
  uploadFileName: string | null;
  uploadFileURL: string | null;
  birthyear_viewing_flg?: number | undefined;
  birthdate_viewing_flg?: number | undefined;
  postal_code_viewing_flg?: number | undefined;
  address_viewing_flg?: number | undefined;
  phone_number_viewing_flg?: number | undefined;
  mobile_phone_number_viewing_flg?: number | undefined;
  email_viewing_flg?: number | undefined;
  members: string[];
}

export type ExtendedAccount = AccountsType & {
  isMember: boolean;
};

export interface OrganizationFormFieldsType {
  name: string;
  representativeName: string;
  activityDescription?: string;
  telNumber: string;
  email: string;
  uploadFile?: File | null;
  uploadFileName: string | null;
  uploadFileURL: string | null;
  birthyearViewingFlg?: number | undefined;
  birthdateViewingFlg?: number | undefined;
  postalCodeViewingFlg?: number | undefined;
  addressViewingFlg?: number | undefined;
  phoneNumberViewingFlg?: number | undefined;
  mobilePhoneNumberViewingFlg?: number | undefined;
  emailViewingFlg?: number | undefined;
  members: string[];
}
