import axiosInstance from "@/modules/common/lib/axios";
import { validateApiResponse } from "@/modules/common/lib/utils";
import { queryKeysFactory } from "@/modules/common/services/get-query-client";
import { useQuery } from "@tanstack/react-query";
import { TListing, TListingCategory } from "../types/listing.types";

export const useFetchListingsCategories = (query: "stay" | "property") => {
  return useQuery({
    queryKey: queryKeysFactory("LISTINGS_CATEGORIES").detail(query),
    queryFn: async () => {
      const { data } = await axiosInstance("/listings/categories", {
        params: {
          type: query,
        },
      });
      return validateApiResponse<TListingCategory[]>(data);
    },
    enabled: !!query,
  });
};

export const useFetchListingDetails = (id: string) => {
  return useQuery({
    queryKey: queryKeysFactory("LISTINGS").detail(id),
    queryFn: async () => {
      const { data } = await axiosInstance(`/listings/${id}`);
      return validateApiResponse<TListing>(data);
    },
    enabled: !!id,
  });
};
