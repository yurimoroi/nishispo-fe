// For Checking User Name if Exist
export type CheckUserNameExistResponseType = {
  success?: boolean;
  message: string;
};

// For Checking Email if Exist
export type CheckEmailExistResponseType = {
  success?: boolean;
  message: string;
  data: string;
};
