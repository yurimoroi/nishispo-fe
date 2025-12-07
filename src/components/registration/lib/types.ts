export type OrganizationDataType = {
  id: string;
  name: string;
};

export type OrganizationResponseType = {
  success: boolean;
  message: string;
  data: OrganizationDataType[];
};

export type RegistrationResponseType = {
  success: boolean;
  message: string;
  errors?: string;
  data: {
    id: string;
  };
};

export type RegistrationProfileResponseType = {
  success: boolean;
  message: string;
  errors?: string;
  data: {
    avatar: string;
  };
};
