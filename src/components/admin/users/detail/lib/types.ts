type StatusLabelType = {
  status: number;
  label: string;
};

type ArticlesCountType = {
  published: number;
  pending: number;
};

type UserPermissionsType = {
  is_secretariat: boolean;
  is_advertiser: boolean;
  can_contribute_article: boolean;
  is_event_leader: boolean;
  is_administrator_flg: boolean;
  is_general: boolean;
};

export type AdminUserDetailType = {
  id: string;
  company_id: string;
  email: string;
  family_name: string;
  given_name: string;
  full_name: string;
  phonetic_family_name: string;
  phonetic_given_name: string;
  nickname: string;
  birth_date: string;
  gender: StatusLabelType;
  postal_code: string;
  province: number;
  address_1: string;
  address_2: string;
  address_3: string;
  phone_number: string;
  mobile_phone_number: string;
  login_id: string;
  email_verified_at: string | null;
  password_reset_token: string | null;
  contributor_name: string;
  rakuten_id: string;
  favorite_sport: string;
  favorite_gourmet: string;
  secretariat_flg: number;
  contributor: StatusLabelType;
  advertiser_flg: number;
  advertiser_name: string;
  line_id: string | null;
  x_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  avatar: string;
  articles_count: ArticlesCountType;
  permissions: UserPermissionsType;

  affiliate: AffiliateType[];
};

export type AffiliateType = {
  id: string;
  name: string;
  logo: string;
  btns: {
    waitingApproval: boolean;
    withdraw: boolean;
    approvedWithdraw: boolean;
  };
};

export type AdminUserDetailResponseType = {
  success: boolean;
  message: string;
  data: AdminUserDetailType;
};

// #region ARTICLE APPROVAL ADMIN
export type AdminContributorApprovalResponseType = {
  success: boolean;
  message: string;
};
// #endregion

// #region User to Organization Approval
export type UserToOrganizationApprovalResponseType = {
  success: boolean;
  message: string;
};
// #endregion

// #region User to Organization Withdraw Approval
export type UserOrganizationWithdrawApprovalResponseType = {
  success: boolean;
  message: string;
};
// #endregion
