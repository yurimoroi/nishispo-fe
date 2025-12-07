export type UserDetailType = {
  id: string;
  company_id: string;
  email: string;
  family_name: string;
  given_name: string;
  phonetic_family_name: string;
  phonetic_given_name: string;
  nickname: string;
  birth_date: string;
  gender: {
    status: number;
    label: string;
  };
  postal_code: string;
  province: string | null;
  address_1: string;
  address_2: string;
  address_3: string;
  phone_number: string;
  mobile_phone_number: string;
  login_id: string;
  email_verified_at: string;
  password_reset_token: string | null;
  contributor_name: string;
  contributor: {
    status: number;
    label: string;
  };
  rakuten_id: string | null;
  favorite_sport: string | null;
  favorite_gourmet: string | null;
  secretariat_flg: number;
  contributor_status: number;
  advertiser_flg: number;
  advertiser_name: string;
  line_id: string | null;
  x_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  avatar: string;
  affiliate: AffiliateType[];
};

export type AffiliateType = {
  id: string;
  name: string;
  logo: string;
  status: {
    status: number;
    label: string;
  };
  btns: {
    waitingApproval: boolean;
    withdraw: boolean;
  };
};

export type UserDetailApiResponseType = {
  success: boolean;
  message: string;
  data: UserDetailType;
};


export type AffiliateWithdrawApiResponseType = {
  success: boolean;
  message: string;
};
