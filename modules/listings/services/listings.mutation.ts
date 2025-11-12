import axiosInstance from "@/modules/common/lib/axios";
import { validateApiResponse } from "@/modules/common/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { TCreateListingInitialValues } from "../types/listing.types";

export const useCreateListingMutation = () => {
  return useMutation({
    mutationFn: async (values: TCreateListingInitialValues) => {
      const { data } = await axiosInstance.post("/listings", values);
      return validateApiResponse<{
        id: number;
      }>(data);
    },
  });
};
