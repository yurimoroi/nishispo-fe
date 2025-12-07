export type AddTagResponseType = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
  };
};


export type CommonListType = {
  id: string;
  name: string;
};

export type ArticleTagResponse = {
  success: boolean;
  message: string;
  data?: CommonListType[];
};

export type ArticleOrganizationType = {
  success: boolean;
  message: string;
  data?: CommonListType[];
};

// #region Article Category
export type ArticleCategoryType = {
  id: string;
  name: string;
  short_name: string | null;
  color: string;
  show_head_flg: number;
  order: number;
  special_flg: number;
  updated_at: string;
};

export type ArticleCategoryResponseType = {
  success: boolean;
  message: string;
  data?: ArticleCategoryType[];
};
// #endregion

// #region ARTICLE IMAGE DELETE
export type ArticleImageDeleteResponseType = {
  success: boolean;
  message: string;
  data: string;
};
// #endregion

export type CacheMediaType = {
  id: number;
  file: File;
};

export type CacheMediaRefType =
  | {
      id: number;
      file: File;
    }[]
  | undefined
  | null;


// #region AFFILIATED MEDIA
export type AffiliatedMediaListResponseType = {
  success: boolean;
  message: string;
  data: AffiliatedMediaListDataType[];
};

export type AffiliatedMediaListDataType = {
  id: string;
  name: string;
  url: string;
}

// #endregion
