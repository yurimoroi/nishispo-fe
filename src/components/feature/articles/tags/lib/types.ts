import { ArticlesResponse } from "../../search";

export type ArticlesTagListResponseType = {
  success: boolean;
  message: string;
  data: ArticlesTagListResponse;
}

export type ArticlesTagListResponse = {
  articles: ArticlesResponse;
  tag: {
    id: string;
    name: string;
  }
}
