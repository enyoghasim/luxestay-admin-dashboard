import * as yup from "yup";
import { jetsQuerySchema } from "../schema/jets";

export type JetQuerySchema = yup.InferType<typeof jetsQuerySchema>;

export const AddJetInitialValues = {
  manufacturer: "",
  model: "",
  classification: "",
  seats: undefined,
  speed: "",
  range: "",
  luggageCapacity: "",
  interiorHeight: undefined,
  interiorWidth: undefined,
  imageIds: [] as string[],
};

export type TAddJetInitialValues = typeof AddJetInitialValues;
