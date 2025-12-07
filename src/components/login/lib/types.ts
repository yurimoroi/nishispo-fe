type UserPermissions = {
  is_secretariat: boolean;
  is_advertiser: boolean;
  can_contribute_article: boolean;
};

type Company = {
  name: string;
};

type User = {
  id: string;
  full_name: string;
  email: string;
  contributor_name: string;
  advertiser_flg: number;
  company: Company;
  permissions: UserPermissions;
  contributor: {
    status: number;
    label: string;
  };
};

export type LoginDataType = {
  token_type: string;
  access_token: string;
  user: User;
};

// The shape below is just a partial of the full API response /auth/login
export type LoginResponseType = {
  success: boolean;
  message: string;
  data: LoginDataType;
};