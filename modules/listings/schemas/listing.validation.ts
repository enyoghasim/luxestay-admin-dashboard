import * as yup from "yup";

export const CreateListingValidationSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["stay", "property"])
    .required("Listing type is required"),
  category: yup
    .string()
    // .oneOf(["residential", "commercial", "land"])
    .required("Listing category is required"),
});
