"use client";
import { Button } from "@/modules/common/components/ui/button";
import CreateListingSheet from "@/modules/listings/components/create-listing-sheet";
import React from "react";
import { LuPlus } from "react-icons/lu";

const ListingsPage = () => {
  const [isCreateListingSheetOpen, setIsCreateListingSheetOpen] =
    React.useState(false);
  return (
    <>
      <div className="p-5">
        <nav className="flex flex-row items-center justify-between">
          <h2 className=" md:text-2xl text-lg font-bold">Listings (53)</h2>
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
