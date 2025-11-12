export const CreateListingInitialValues = {
  type: "" as TListingType,
  category: "",
};

export type TListingType = "stay" | "property";

export type TListingCategory = {
  createdAt: string;
  description: string;
  id: number;
  name: string;
  type: TListingType;
};

export type TCreateListingInitialValues = typeof CreateListingInitialValues;

export type TListing = {
  id: string;
  type: TListingType;
};
