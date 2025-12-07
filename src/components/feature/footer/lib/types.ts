export interface CompanyResponseType {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: string;
  name: string;
  tel_number: string;
  leader_name: string;
  email: string;
  terms: string;
  terms_updated_at: Date;
  about_service: string;
  about_service_updated_at: Date;
  about_company: string;
  about_company_updated_at: Date;
  privacy_policy: string;
  privacy_policy_updated_at: Date;
  about_report: string;
  about_report_updated_at: Date;
  about_publish_content: string;
  about_publish_content_updated_at: Date;
  ad: string;
  ad_updated_at: Date;
  reporter_editor: string;
  reporter_editor_updated_at: Date;
  post_limit: number;
  organization_member_post_limit: number;
  organization_post_limit: number;
  line_official_ch_url: string;
  trial_campaigh_started_at: null;
  trial_campaigh_ended_at: null;
  trial_days: number;
  trial_enabled_flg: number;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}
