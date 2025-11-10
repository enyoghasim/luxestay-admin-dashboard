import * as yup from "yup";
import { jetsQuerySchema } from "../schema/jets";

export type JetQuerySchema = yup.InferType<typeof jetsQuerySchema>;
