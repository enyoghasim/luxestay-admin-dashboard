import * as yup from "yup";

export const jetsQuerySchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().min(2).max(100).required(),
  location: yup.string().min(2).max(100).required(),
  price: yup.number().min(0).required(),
  amenities: yup.array().of(yup.string()).required(),
});

export const AddJetSchema = yup.object().shape({
  manufacturer: yup.string().min(1).max(128).required(),
  model: yup.string().min(1).max(128).required(),
  classification: yup.string().min(1).max(64).required(),
  seats: yup.number().min(1).required(),
  speed: yup.string().min(1).max(64).required(),
  range: yup.string().min(1).max(64).required(),
  luggageCapacity: yup
    .string()
    .min(1)
    .max(64)
    .required("Luggage capacity is required"),
  interiorHeight: yup.number().required("Interior height is required"),
  interiorWidth: yup.number().required("Interior width is required"),
  imageIds: yup
    .array()
    .of(yup.string())
    .min(1, "At least one image is required")
    .required(),
});
