export interface DashboardResponseType {
  success: boolean;
  message: string;
  data: DashboardType;
}

export interface DashboardType {
  contributor_waiting_approval: number;
  article_waiting_approval: number;
  article_waiting_edit_approval: number;
  article_waiting_delete_approval: number;
  article_with_revision: number;
  event_participation_approval: number;
  withdrawal_request_pending_approval: number;
  upgrade_approval: number;
  downgrade: number;
  club_payment_type_count: number;
  club_usage_rights: number;
}
