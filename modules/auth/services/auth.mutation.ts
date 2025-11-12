import axiosInstance from "@/modules/common/lib/axios";
import {
  resetFormStatus,
  handleApiError,
  validateApiResponse,
} from "@/modules/common/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { FormikHelpers } from "formik";
import {
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
  SigninFormValues,
} from "../types/auth.types";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();
  const { mutateAsync: signinMutation } = useMutation({
    mutationFn: async (values: SigninFormValues) => {
      const { data } = await axiosInstance.post("/auth/admin/signin", values);
      return validateApiResponse(data);
    },
  });

  const { mutateAsync: forgotPasswordMutation } = useMutation({
    mutationFn: async (values: ForgotPasswordFormValues) => {
      const { data } = await axiosInstance.post(
        "/auth/admin/forgot-password",
        values
      );
      return validateApiResponse(data);
    },
  });

  const { mutateAsync: resetPasswordMutation } = useMutation({
    mutationFn: async (values: ResetPasswordFormValues) => {
      const { data } = await axiosInstance.post(
        `/auth/admin/reset-password/${values.selector}/${values.token}`,
        {
          password: values.password,
          confirmPassword: values.confirmPassword,
        }
      );
      return validateApiResponse(data);
    },
  });

  const signin = async (
    values: SigninFormValues,
    helpers: FormikHelpers<SigninFormValues>
  ) => {
    try {
      resetFormStatus(helpers);
      await signinMutation(values);
      router.push("/");
    } catch (error) {
      helpers.setStatus({ error: handleApiError(error).message });
    }
  };

  const forgotPassword = async (
    values: ForgotPasswordFormValues,
    helpers: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      resetFormStatus(helpers);
      await forgotPasswordMutation(values);
    } catch (error) {
      helpers.setStatus({ error: handleApiError(error).message });
    }
  };

  const resetPassword = async (
    values: ResetPasswordFormValues,
    helpers: FormikHelpers<ResetPasswordFormValues>
  ) => {
    try {
      resetFormStatus(helpers);
      await resetPasswordMutation(values);
    } catch (error) {
      helpers.setStatus({ error: handleApiError(error).message });
    }
  };

  return {
    signin,
    forgotPassword,
    resetPassword,
  };
}
