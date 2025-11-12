"use client";

import * as React from "react";
import { LuEllipsisVertical } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/modules/common/components/ui/dropdown-menu";

import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "@/modules/common/components/ui/card";

import type { TListing } from "@/modules/listings/types/listing.types";

type Props = {
  listing: TListing;
  onViewDetails?: (listing: TListing) => void;
};

export default function PropertyCard({ listing, onViewDetails }: Props) {
  // Radix dropdown manages its own open state, no local `open` required.
  const router = useRouter();

  const handleViewDetails = React.useCallback(() => {
    onViewDetails?.(listing);
    // Navigate to the public listing detail page
    void router.push(`/listings/${listing.id}`);
  }, [listing, onViewDetails, router]);

  // Simple currency formatting. Assumes `base_price_minor` is in minor units
  // (e.g. cents). We divide by 100 to get major units. If your API uses
  // different minor-unit conventions per currency adjust accordingly.
  const price = (listing.base_price_minor ?? 0) / 100;
  const formattedPrice = React.useMemo(() => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: listing.baseCurrency || "USD",
      }).format(price);
    } catch {
      return `${listing.baseCurrency ?? ""} ${price.toFixed(2)}`;
    }
  }, [price, listing.baseCurrency]);

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-start gap-3">
          <CardTitle className="truncate max-w-[60%]">{listing.name}</CardTitle>
          {listing.isInternal && (
            <span className="ml-2 rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
              luxestay admin posted this
            </span>
          )}
        </div>

        <CardAction>
          {/* Use the shadcn / Radix dropdown primitives */}
          <div className="relative inline-block text-left">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center rounded-md p-2 text-sm hover:bg-accent/60">
                  <LuEllipsisVertical className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={handleViewDetails}>
                  <Eye className="size-4" />
                  View details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {listing.fullAddress ?? listing.city ?? listing.country}
          </div>
          <div className="text-base font-semibold">{formattedPrice}</div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded px-2 py-1 text-xs bg-muted/20">
            Type: {listing.type}
          </span>
          <span className="rounded px-2 py-1 text-xs bg-muted/20">
            Status: {listing.status}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
          <div>Rating: {listing.propertyRating ?? 0}</div>
          <div className="text-xs text-muted-foreground">
            Created: {new Date(listing.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
