import * as yup from "yup";

export const paginatedParamsSchema = yup.object().shape({
  limit: yup.number().min(1).max(100).default(50).optional(),
  cursorCreatedAt: yup.string().optional(),
  cursorId: yup.string().optional(),
  //   status: yup.string().oneOf(["live", "draft", "archived"]).optional(),
});

export type TSearchParams = yup.InferType<typeof paginatedParamsSchema>;
