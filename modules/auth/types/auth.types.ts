export const signinFormInitialValues = {
  email: "",
  password: "",
};

export type signinFormValues = {
  email: string;
  password: string;
};

export type forgotPasswordFormValues = {
  email: string;
};

export const forgotPasswordFormInitialValues = {
  email: "",
};

export const resetPasswordFormInitialValues = {
  password: "",
  confirmPassword: "",
};

export type resetPasswordFormValues = {
  selector: string;
  token: string;
  password: string;
  confirmPassword: string;
};
