import { PaginationLink } from "@/components/feature/articles/search";

export type AdminOrganizationNameListResponseType = {
  success: boolean;
  message: string;
  data: AdminOrganizationNameListResponse;
};

export type AdminOrganizationNameListResponse = {
  organizations: AdminOrganizationNameListDataType[];
};

export type AdminOrganizationNameListDataType = {
  id: number;
  name: string;
};

export type getAdminTeamsDataResponseType = {
  success: boolean;
  message: string;
  data: getAdminTeamsDataResponse;
};

export type getAdminTeamsDataResponse = {
  data: getAdminTeamsDataDataType[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  path: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number | string;
  links: PaginationLink[];
};

export type getAdminTeamsDataDataType = {
  id: string;
  name: string;
  description: string;
  team: TeamDataType;
  event_images: string[] | string;
};

export type TeamDataType = {
  id: string;
  name: string;
  first_estimated_number: number;
  closing_date: string;
  collection_type: {
    status: string;
    label: string;
  };
  organization: OrganizationDataType;
  groupware_privileges: GroupwarePrivilegesDataType[];
};

export type OrganizationDataType = {
  id: string;
  name: string;
  logo: string;
};

export type GroupwarePrivilegesDataType = {
  id: string;
  price: number;
  payment_flg: number;
};

export interface FormTeamType {
  orgName: string;
  image: File;
  eventName: string;
  eventLeader: string[];
  activitiesDetails: string;
  membersFee: number;
  membersInformation: string;
  settlementType: string;
  moneyCollectingSpan: string;
}

export interface TeamDetailsResponseType {
  success: boolean;
  message: string;
  data: TeamDetailsType;
  errors?: any;
}

export interface TeamDetailsType {
  id: string;
  name: string;
  description: null;
  started_at: string;
  ended_at: string;
  all_day_flg: number;
  activity_location_type: number;
  activity_location: ActivityLocation;
  location_name: null;
  aggregation_location_flg: number;
  aggregation_location_type: null;
  aggregation_location_name: null;
  team_group_id: null;
  attendance_flg: number;
  capacity: number;
  reply_deadline: string;
  not_other_answer_flg: number;
  no_answer: ActivityLocation;
  late_declaration_flg: number;
  late_declaration: ActivityLocation;
  leave_early_declaration_flg: number;
  leave_early: ActivityLocation;
  show_participant_list_type: number;
  show_participant_list: ActivityLocation;
  show_participant_classification_type: number;
  show_participant_classification: ActivityLocation;
  save_timeline_flg: number;
  notification_setting: number;
  repetition_flg: number;
  repetition_event_hash: null;
  repetition_started_at: string;
  repetition_ended_type: null;
  repetition_ended_at: string;
  repetition_interval_type: null;
  repetiton_week: string;
  repetition_month_basis_type: null;
  repetition_month_day: null;
  repetition_week_of_month: null;
  repetition_day_of_week: null;
  team: Team;
  event_images: string;
}

export interface ActivityLocation {
  status: number;
  label: string;
}

export interface Team {
  id: string;
  name: string;
  activity_description: string;
  member_information: string;
  group_fee: number;
  collect_type: number;
  collect_span: string;
  closing_date: number;
  first_estimated_number: number;
  organization: Organization;
  groupware_privileges: any[];
  collection_type: ActivityLocation;
  leaders: Leader[];
}

export interface Leader {
  user_id: string;
  family_name: string;
  given_name: string;
  phonetic_family_name: string;
  phonetic_given_name: string;
  nickname: string;
}

export interface Organization {
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
