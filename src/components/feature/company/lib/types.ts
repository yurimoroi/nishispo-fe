export type AlignmentMediaResponseType = {
  success: boolean;
  message: string;
  data: AlignmentMediaResponse[];
}

export type AlignmentMediaResponse = {
  id: string;
  company_id: string,
  name: string;
  url: string;
  display_top_flg: string;
  display_article_list_flg: string;
  display_flg: string;
}