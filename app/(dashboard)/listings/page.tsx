"use client";
import { Button } from "@/modules/common/components/ui/button";
import CreateListingSheet from "@/modules/listings/components/create-listing-sheet";
import { useFetchListings } from "@/modules/listings/services/listings.query";
import { useListingFiltersStore } from "@/modules/listings/store/listingFiltersStore";
import { Loader } from "lucide-react";
import React, { useMemo } from "react";
import { LuPlus } from "react-icons/lu";

const ListingsPage = () => {
  const [isCreateListingSheetOpen, setIsCreateListingSheetOpen] =
    React.useState(false);

  const { filters } = useListingFiltersStore();

  const { data: listings, isFetching } = useFetchListings(filters);

  const listingData = useMemo(() => {
    return listings?.pages.flatMap((page) => page.data) || [];
  }, [listings]);

  return (
    <>
      <div className="p-5">
        <nav className="flex flex-row items-center justify-between">
          <h2 className=" md:text-2xl text-lg font-bold flex flex-row items-center">
            Listings (
            {isFetching ? (
              <Loader className=" animate-spin" />
            ) : (
              listingData.length
            )}
            )
          </h2>
          <Button
            className=""
            onClick={() => setIsCreateListingSheetOpen(true)}
          >
            <LuPlus />
            <span>Create Listing</span>
          </Button>
        </nav>
      </div>

      <CreateListingSheet
        isOpen={isCreateListingSheetOpen}
        onClose={() => {
          setIsCreateListingSheetOpen(false);
        }}
      />
    </>
  );
};

export default ListingsPage;
