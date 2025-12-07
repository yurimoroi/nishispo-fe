export interface AccountsResponseType {
  success: boolean;
  message: string;
  data: AccountsDataType;
}

export interface AccountsDataType {
  current_page: number;
  data: AccountsType[];
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

export interface AccountsType {
  id: string;
  company_id: string;
  email: string;
  family_name: string;
  given_name: string;
  full_name: string;
  phonetic_family_name: string;
  phonetic_given_name: string;
  nickname: string;
  birth_date: Date;
  gender: Contributor;
  postal_code: string;
  province: null;
  address_1: string;
  address_2: string;
  address_3: string;
  phone_number: string;
  mobile_phone_number: string;
  login_id: string;
  email_verified_at: Date;
  password_reset_token: null;
  contributor_name: null;
  rakuten_id: null;
  favorite_sport: null;
  favorite_gourmet: null;
  secretariat_flg: number;
  contributor: Contributor;
  advertiser_flg: number;
  advertiser_name: null | string;
  line_id: null;
  x_id: null;
  facebook_id: null;
  instagram_id: null;
  avatar: string;
  organizations: Organization[];
  permissions: Permissions;
}

export interface Contributor {
  status: number;
  label: string;
}

export interface Organization {
  id: string;
  name: string;
  representative_name: string;
  tel_number: string;
  email: string;
  activity_description: string;
  birthyear_viewing_flg: boolean | undefined;
  birthdate_viewing_flg: boolean | undefined;
  postal_code_viewing_flg: boolean | undefined;
  address_viewing_flg: boolean | undefined;
  phone_number_viewing_flg: boolean | undefined;
  mobile_phone_number_viewing_flg: boolean | undefined;
  email_viewing_flg: number;
  logo: string;
}

export interface Permissions {
  is_secretariat: boolean;
  is_advertiser: boolean;
  can_contribute_article: boolean;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface AccountsPaginationDataType {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: Link[];
}
