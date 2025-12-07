export interface ContributorsTrainingsResponseType {
  success: boolean;
  message: string;
  data: TriningDataType[];
}

export interface TriningDataType {
  id: string;
  type: number;
  title: string;
  url: string;
  no: number;
  overview: string;
  users_contributor_trainings: UsersContributorTrainings | null;
}

export interface UsersContributorTrainings {
  id: string;
  contributor_training_id: string;
  user_id: string;
  deleted_at: null;
  created_at: Date;
  updated_at: Date;
}
