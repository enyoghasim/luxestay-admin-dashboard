import axiosInstance from "@/modules/common/lib/axios";
import {
  resetFormStatus,
  handleApiError,
  validateApiResponse,
} from "@/modules/common/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { FormikHelpers } from "formik";
import { SigninFormValues } from "../types/auth.types";

export default function useAuth() {
  const { mutateAsync: signinMutation } = useMutation({
    mutationFn: async (values: SigninFormValues) => {
      const { data } = await axiosInstance.post("/auth/login", values);
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
    } catch (error) {
      helpers.setStatus({ error: handleApiError(error).message });
    }
  };

  return {
    signin,
  };
}
