import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { FormikHelpers } from "formik";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApiError(error: unknown): Error {
  if (error instanceof AxiosError) {
    const apiMessage = error.response?.data?.message;

    if (apiMessage) return new Error(apiMessage);

    if (error.message) return new Error(error.message);
  }

  return new Error("Something went wrong. Please try again later.");
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export function validateApiResponse<T>(response: ApiResponse<T>): T {
  if (!response || !response.success) {
    throw new Error(response.message || "An error occurred");
  }
  return response.data as T;
}

export function resetFormStatus<T>(helpers: FormikHelpers<T>) {
  helpers.setStatus(null);
}
