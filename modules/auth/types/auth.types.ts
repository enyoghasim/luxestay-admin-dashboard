export const SigninFormInitialValues = {
  email: "",
  password: "",
};

export type SigninFormValues = {
  email: string;
  password: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export const ForgotPasswordFormInitialValues = {
  email: "",
};

export const ResetPasswordFormInitialValues = {
  password: "",
  confirmPassword: "",
};

export type ResetPasswordFormValues = {
  selector: string;
  token: string;
  password: string;
  confirmPassword: string;
};
