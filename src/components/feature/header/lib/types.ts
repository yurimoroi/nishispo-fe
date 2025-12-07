//#region For Header Top Categories
export type TopCategoryType = {
  id: string;
  company_id: string;
  name: string;
  short_name: string | null;
  color: string;
  show_head_flg: number;
  order: number;
  special_flg: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type TopCategoriesResponseType = {
  success: boolean;
  message: string;
  data: TopCategoryType[];
};
//#endregion

export type WeatherMetadataType = {
  datetime: string;
  temperatureMax: string;
};
