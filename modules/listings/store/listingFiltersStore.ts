import { create } from "zustand";
import { TListingQuery } from "@/modules/listings/types/listing.types";

type ListingFiltersState = {
  filters: TListingQuery;
  setFilters: (
    patch: Partial<TListingQuery> | ((prev: TListingQuery) => TListingQuery)
  ) => void;
  resetFilters: () => void;
};

const initialFilters: TListingQuery = {
  limit: 25,
};

export const useListingFiltersStore = create<ListingFiltersState>((set) => ({
  filters: initialFilters,
  setFilters: (patch) =>
    set((state) => ({
      filters:
        typeof patch === "function"
          ? patch(state.filters)
          : { ...state.filters, ...patch },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));

export default useListingFiltersStore;
