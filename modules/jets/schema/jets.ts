import * as yup from "yup";

export const jetsQuerySchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().min(2).max(100).required(),
  location: yup.string().min(2).max(100).required(),
  price: yup.number().min(0).required(),
  amenities: yup.array().of(yup.string()).required(),
});
