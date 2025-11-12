"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useFetchListingDetails } from "@/modules/listings/services/listings.query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/modules/common/components/ui/dialog";
import { Button } from "@/modules/common/components/ui/button";
import { Input } from "@/modules/common/components/ui/input";
import { Textarea } from "@/modules/common/components/ui/textarea";
import {
  GoogleAutocompleteInput,
  PlaceDetails,
} from "@/modules/common/components/ui/google-autocomplete-input";
import { LuPencil } from "react-icons/lu";
import { Field, Form, Formik } from "formik";
import {
  EditBasicInfoValidationSchema,
  TEditBasicInfoValues,
  EditLocationValidationSchema,
  TEditLocationValues,
} from "@/modules/listings/schemas/edit-listing.validation";

const SingleListingPage = () => {
  const params = useParams<{ "listing-id": string }>();
  const listingId = params["listing-id"];

  const { data: listing, isLoading, error } = useFetchListingDetails(listingId);

  const [isEditBasicInfoOpen, setIsEditBasicInfoOpen] = useState(false);
  const [isEditLocationOpen, setIsEditLocationOpen] = useState(false);
  const [isLocationAutoFilled, setIsLocationAutoFilled] = useState(false);

  const handleEditBasicInfo = () => {
    setIsEditBasicInfoOpen(true);
  };

  const handleSaveBasicInfo = (values: TEditBasicInfoValues) => {
    console.log("Saving values:", values);
    setIsEditBasicInfoOpen(false);
  };

  const handleEditLocation = () => {
    setIsEditLocationOpen(true);
    setIsLocationAutoFilled(false);
  };

  const handleSaveLocation = (values: TEditLocationValues) => {
    console.log("Saving location:", values);
    setIsEditLocationOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-neutral-500">Loading listing details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">Error loading listing details</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-neutral-500">Listing not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Basic Information Section */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Basic Information
          </h2>
          <Button variant="ghost" size="icon" onClick={handleEditBasicInfo}>
            <LuPencil className="size-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">Name</p>
            <p className="text-base text-neutral-900">{listing.name}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">
              Description
            </p>
            <p className="text-base text-neutral-900">
              {listing.description || "No description provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Location Details Section */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Location Details
          </h2>
          <Button variant="ghost" size="icon" onClick={handleEditLocation}>
            <LuPencil className="size-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Full Address */}
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">
              Full Address
            </p>
            <p className="text-base text-neutral-900">
              {listing.fullAddress || "No address provided"}
            </p>
          </div>

          {/* City */}
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">City</p>
            <p className="text-base text-neutral-900">
              {listing.city || "No city provided"}
            </p>
          </div>

          {/* State */}
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">
              State/Province
            </p>
            <p className="text-base text-neutral-900">
              {listing.state || "No state provided"}
            </p>
          </div>

          {/* Country */}
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">Country</p>
            <p className="text-base text-neutral-900">
              {listing.country || "No country provided"}
            </p>
          </div>

          {/* Postal Code */}
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">
              Postal Code
            </p>
            <p className="text-base text-neutral-900">
              {listing.postalCode || "No postal code provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Basic Information Dialog */}
      <Dialog open={isEditBasicInfoOpen} onOpenChange={setIsEditBasicInfoOpen}>
        <DialogContent className="md:max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Edit Basic Information</DialogTitle>
            <DialogDescription>
              Update the name and description of this listing
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{
              name: listing?.name || "",
              description: listing?.description || "",
            }}
            validationSchema={EditBasicInfoValidationSchema}
            onSubmit={handleSaveBasicInfo}
            enableReinitialize
          >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <Field
                    as={Input}
                    name="name"
                    type="text"
                    label="Name"
                    placeholder="Enter listing name"
                    required
                    error={
                      touched.name && errors.name ? errors.name : undefined
                    }
                  />
                  <Field
                    as={Textarea}
                    name="description"
                    label="Description"
                    placeholder="Enter listing description (minimum 100 characters)"
                    rows={5}
                    error={
                      touched.description && errors.description
                        ? errors.description
                        : undefined
                    }
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditBasicInfoOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" loading={isSubmitting}>
                    Save Changes
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Edit Location Dialog */}
      <Dialog open={isEditLocationOpen} onOpenChange={setIsEditLocationOpen}>
        <DialogContent
          className="md:max-w-md w-full"
          onPointerDownOutside={(e) => {
            // Prevent dialog from closing when clicking on Google Maps autocomplete dropdown
            const target = e.target as HTMLElement;
            if (target.closest(".pac-container")) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Location Details</DialogTitle>
            <DialogDescription>
              Search and select an address to auto-populate all fields
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{
              fullAddress: listing?.fullAddress || "",
              city: listing?.city || "",
              country: listing?.country || "",
              state: listing?.state || "",
              postalCode: listing?.postalCode || "",
            }}
            validationSchema={EditLocationValidationSchema}
            onSubmit={handleSaveLocation}
            enableReinitialize
          >
            {({
              handleSubmit,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              values,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="py-4">
                  <GoogleAutocompleteInput
                    label="Search Address"
                    placeholder="Start typing to search..."
                    required
                    value={values.fullAddress}
                    onChange={(value, placeDetails?: PlaceDetails) => {
                      setFieldValue("fullAddress", value);
                      if (placeDetails) {
                        setIsLocationAutoFilled(true);
                        setFieldValue("city", placeDetails.city);
                        setFieldValue("country", placeDetails.country);
                        setFieldValue("state", placeDetails.state);
                        setFieldValue("postalCode", placeDetails.postalCode);
                        // Reset touched state for auto-filled fields
                        setFieldTouched("city", false);
                        setFieldTouched("country", false);
                        setFieldTouched("state", false);
                        setFieldTouched("postalCode", false);
                      } else {
                        setIsLocationAutoFilled(false);
                      }
                    }}
                    error={
                      touched.fullAddress && errors.fullAddress
                        ? errors.fullAddress
                        : undefined
                    }
                  />

                  <div className="space-y-4 pt-2">
                    <p className="text-xs text-neutral-500">
                      {isLocationAutoFilled
                        ? "✓ Address details auto-populated"
                        : "Select an address above to auto-fill these fields"}
                    </p>

                    <Field
                      as={Input}
                      name="city"
                      type="text"
                      label="City"
                      placeholder="City"
                      required
                      disabled
                      error={
                        touched.city && errors.city ? errors.city : undefined
                      }
                    />

                    <Field
                      as={Input}
                      name="state"
                      type="text"
                      label="State/Province"
                      placeholder="State or Province"
                      disabled
                      error={
                        touched.state && errors.state ? errors.state : undefined
                      }
                    />

                    <Field
                      as={Input}
                      name="country"
                      type="text"
                      label="Country"
                      placeholder="Country"
                      required
                      disabled
                      error={
                        touched.country && errors.country
                          ? errors.country
                          : undefined
                      }
                    />

                    <Field
                      as={Input}
                      name="postalCode"
                      type="text"
                      label="Postal Code"
                      placeholder="Postal/ZIP Code"
                      disabled
                      error={
                        touched.postalCode && errors.postalCode
                          ? errors.postalCode
                          : undefined
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditLocationOpen(false);
                      setIsLocationAutoFilled(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" loading={isSubmitting}>
                    Save Changes
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleListingPage;
