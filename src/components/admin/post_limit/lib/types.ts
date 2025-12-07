// This just the partial response
export type PostLimitResponseData = {
  id: string;
};
export type PostLimitResponseType = {
  success: boolean;
  message: string;
  data: PostLimitResponseData;
};
