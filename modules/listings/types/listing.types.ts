export const CreateListingInitialValues = {
  type: "" as TListingType,
  category: "",
};

export type TListingType = "stay" | "property";

export type TListingStatus =
  | "available"
  | "unavailable"
  | "under_maintenance"
  | "pending_approval"
  | "closed"
  | "in_progress";

export type TListingCategory = {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  type: TListingType;
};

export type TCreateListingInitialValues = typeof CreateListingInitialValues;

export type TListing = {
  id: number;
  type: TListingType;
  baseCurrency: string;
  base_price_minor: number;
  city: string | null;
  country: string | null;
  state: string | null;
  postalCode: string | null;
  createdAt: string;
  description: string | null;
  fullAddress: string | null;
  host: number;
  isInternal: boolean;
  listingCategoryId: number;
  locationVerifiedByTeam: boolean;
  name: string;
  propertyRating: number;
  status: TListingStatus;
};

export type TListingQuery = {
  limit?: number;
  status?: TListingStatus;
  listingCategoryId?: number;
  type?: TListingType;
  isInternal?: boolean;
  search?: string;
};
