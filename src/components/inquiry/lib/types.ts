export interface InquiryFormType {
  name: string;
  subject: string | number;
  body: string;
  email: string;
}

export interface InquiryResponseType {
  success: boolean;
  message: string;
  data: null;
  errors?: {
    name: string[];
    email: string[];
    body: string[];
    inquiry_type_id: string[];
  };
}

export interface InquiryTypesResponseType {
  success: boolean;
  message: string;
  data: InquiryType[];
}

export interface InquiryType {
  id: string;
  company_id: string;
  name: string;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface InquiryTransformType {
  id: string;
  label: string;
}
