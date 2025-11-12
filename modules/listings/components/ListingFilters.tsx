"use client";

import * as React from "react";
import { debounce } from "lodash";
import { X } from "lucide-react";
import { Input } from "@/modules/common/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/components/ui/select";
import { Button } from "@/modules/common/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/modules/common/components/ui/sheet";
import { useListingFiltersStore } from "@/modules/listings/store/listingFiltersStore";
import type {
  TListingStatus,
  TListingType,
} from "@/modules/listings/types/listing.types";

type ListingFiltersProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ListingFilters({
  open,
  onOpenChange,
}: ListingFiltersProps) {
  const { filters, setFilters, resetFilters } = useListingFiltersStore();

  const [searchValue, setSearchValue] = React.useState(filters.search || "");

  const debouncedSetSearchRef = React.useRef(
    debounce((value: string, setter: typeof setFilters) => {
      setter({ search: value || undefined });
    }, 500)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSetSearchRef.current(value, setFilters);
  };

  const handleStatusChange = (value: string) => {
    setFilters({
      status: value === "all" ? undefined : (value as TListingStatus),
    });
  };

  const handleTypeChange = (value: string) => {
    setFilters({ type: value === "all" ? undefined : (value as TListingType) });
  };

  const handleIsInternalChange = (value: string) => {
    setFilters({
      isInternal: value === "all" ? undefined : value === "true",
    });
  };

  const hasActiveFilters =
    filters.status ||
    filters.type ||
    filters.isInternal !== undefined ||
    filters.search;

  const handleApplyFilters = () => {
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setSearchValue("");
    resetFilters();
    // onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Filter Listings
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            <Input
              placeholder="Search listing by name"
              value={searchValue}
              label="Search"
              onChange={handleSearchChange}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.status || "all"}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                  <SelectItem value="under_maintenance">
                    Under Maintenance
                  </SelectItem>
                  <SelectItem value="pending_approval">
                    Pending Approval
                  </SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select
                value={filters.type || "all"}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="stay">Stay</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Posted by</label>
              <Select
                value={
                  filters.isInternal === undefined
                    ? "all"
                    : filters.isInternal
                    ? "true"
                    : "false"
                }
                onValueChange={handleIsInternalChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sources</SelectItem>
                  <SelectItem value="true">Internal (Admin)</SelectItem>
                  <SelectItem value="false">External (Hosts)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active filters indicator */}
            {hasActiveFilters && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="mb-2 text-sm font-medium">Active filters:</div>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      Search: {filters.search}
                    </span>
                  )}
                  {filters.status && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {filters.status.replace("_", " ")}
                    </span>
                  )}
                  {filters.type && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      Type: {filters.type}
                    </span>
                  )}
                  {filters.isInternal !== undefined && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {filters.isInternal ? "Internal" : "External"}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <SheetFooter className="flex-row gap-2">
          <Button
            // variant="outline"
            onClick={handleResetFilters}
            className="flex-1"
          >
            <X className="mr-2 size-4" />
            Reset Filters
          </Button>
          {/* <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
