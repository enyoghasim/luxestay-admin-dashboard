import axiosInstance from "@/modules/common/lib/axios";
import {
  PaginatedResponse,
  validateApiResponse,
} from "@/modules/common/lib/utils";
import { queryKeysFactory } from "@/modules/common/services/get-query-client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  TListing,
  TListingCategory,
  TListingQuery,
} from "../types/listing.types";

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

export const useFetchListings = (query?: TListingQuery) => {
  return useInfiniteQuery({
    queryKey: queryKeysFactory("LISTINGS").list(query),
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance("/admin/listings", {
        params: {
          ...query,
          ...(pageParam
            ? {
                cursorCreatedAt: pageParam.createdAt,
                cursorId: pageParam.id,
              }
            : {}),
        },
      });
      return validateApiResponse<PaginatedResponse<TListing>>(data);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
  });
};
