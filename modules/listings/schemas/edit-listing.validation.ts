import * as yup from "yup";

export const EditBasicInfoValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup
    .string()
    .min(100, "Description must be at least 100 characters"),
});

export const EditBasicInfoInitialValues = {
  name: "",
  description: "",
};

export type TEditBasicInfoValues = typeof EditBasicInfoInitialValues;

export const EditLocationValidationSchema = yup.object().shape({
  fullAddress: yup.string().required("Full address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().optional(),
  postalCode: yup.string().optional(),
});

export const EditLocationInitialValues = {
  fullAddress: "",
  city: "",
  country: "",
  state: "",
  postalCode: "",
};

export type TEditLocationValues = typeof EditLocationInitialValues;
