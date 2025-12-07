export type ChangePasswordResponseType = {
  success: boolean;
  message: "password_change_success";
  data: null;
  errors?: { [key in 'currentPassword' | 'password' | 'confirmPassword']: string[] };
};
