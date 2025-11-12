"use client";
import { Button } from "@/modules/common/components/ui/button";
import CreateListingSheet from "@/modules/listings/components/create-listing-sheet";
import { useFetchListings } from "@/modules/listings/services/listings.query";
import { useListingFiltersStore } from "@/modules/listings/store/listingFiltersStore";
import { Loader, Filter } from "lucide-react";
import React, { useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import PropertyCard from "@/modules/listings/components/PropertyCard";
import ListingFilters from "@/modules/listings/components/ListingFilters";

const ListingsPage = () => {
  const [isCreateListingSheetOpen, setIsCreateListingSheetOpen] =
    React.useState(false);
  const [isFiltersSheetOpen, setIsFiltersSheetOpen] = React.useState(false);

  const { filters } = useListingFiltersStore();

  const {
    data: listings,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchListings(filters);

  const listingData = useMemo(() => {
    return listings?.pages.flatMap((page) => page.data) || [];
  }, [listings]);

  return (
    <>
      <div className="p-5">
        <nav className="flex md:flex-row flex-col gap-5  md:items-center justify-between">
          <h2 className=" md:text-2xl text-lg font-bold flex flex-row items-center">
            Listings (
            {isFetching ? (
              <Loader className=" animate-spin" />
            ) : (
              listingData.length
            )}
            )
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsFiltersSheetOpen(true)}
            >
              <Filter className="size-4" />
              <span>Filters</span>
            </Button>
            <Button
              className=""
              onClick={() => setIsCreateListingSheetOpen(true)}
            >
              <LuPlus />
              <span>Create Listing</span>
            </Button>
          </div>
        </nav>
      </div>

      <div className="p-5">
        {/* Listing area */}
        {isLoading ? (
          <div className="py-12 text-center">
            <Loader className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
            <div className="mt-2 text-sm text-muted-foreground">
              Loading listings...
            </div>
          </div>
        ) : listingData.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No listings found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {listingData.map((l) => (
              <PropertyCard key={l.id} listing={l} onViewDetails={() => {}} />
            ))}
          </div>
        )}

        {/* Load more */}
        <div className="mt-6 flex justify-center">
          {hasNextPage ? (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </Button>
          ) : (
            listingData.length > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                No more listings
              </div>
            )
          )}
        </div>
      </div>

      <CreateListingSheet
        isOpen={isCreateListingSheetOpen}
        onClose={() => {
          setIsCreateListingSheetOpen(false);
        }}
      />

      <ListingFilters
        open={isFiltersSheetOpen}
        onOpenChange={setIsFiltersSheetOpen}
      />
    </>
  );
};

export default ListingsPage;
