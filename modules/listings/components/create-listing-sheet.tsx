import { Button } from "@/modules/common/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/modules/common/components/ui/sheet";
import * as React from "react";

import { Form, useFormik, FormikProvider } from "formik";
import {
  CreateListingInitialValues,
  TListingCategory,
  TListingType,
} from "../types/listing.types";
import { CreateListingValidationSchema } from "../schemas/listing.validation";
import { useListing } from "../hooks/listing.hooks";
import { useFetchListingsCategories } from "../services/listings.query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/components/ui/select";

const CreateListingSheet: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
}> = ({ isOpen = false, onClose }) => {
  const { createListing } = useListing();

  const formik = useFormik({
    initialValues: CreateListingInitialValues,
    validationSchema: CreateListingValidationSchema,
    onSubmit: createListing,
  });

  const {
    data: listingCategories,
    isFetching: fetchingListingCategories,
    isError: listingCategoriesError,
  } = useFetchListingsCategories(formik.values.type);

  return (
    <FormikProvider value={formik}>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create Listing</SheetTitle>
          </SheetHeader>

          <div className="grid h-[calc(100vh-124px)] overflow-y-auto flex-1 auto-rows-min gap-6 px-4">
            <Form onSubmit={formik.handleSubmit} className="space-y-4 w-full">
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Listing Type
                </label>
                <Select
                  value={formik.values.type}
                  onValueChange={async (val: TListingType) => {
                    await formik.setFieldValue("type", val, true);
                    formik.setFieldValue("category", "");
                    formik.setFieldTouched("category", false, false);
                    formik.setFieldTouched("type", true, false);
                  }}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select listing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stay">Stay</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                  </SelectContent>
                </Select>
                {formik.errors?.type ? (
                  <p className="text-xs text-red-600 mt-1">
                    {formik.errors.type}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Category
                </label>

                <Select
                  value={formik.values.category}
                  onValueChange={(val: string) =>
                    formik.setFieldValue("category", val)
                  }
                  disabled={
                    fetchingListingCategories || !!listingCategoriesError
                  }
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue
                      placeholder={
                        fetchingListingCategories
                          ? "Loading categories..."
                          : listingCategoriesError
                          ? "Failed to load categories"
                          : "Select category"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {fetchingListingCategories ? (
                      <SelectItem value="loading" disabled>
                        fetching categories...
                      </SelectItem>
                    ) : listingCategoriesError ? (
                      <SelectItem value="error" disabled>
                        Error loading categories
                      </SelectItem>
                    ) : (
                      (listingCategories || []).map((cat: TListingCategory) => (
                        <SelectItem
                          key={cat.id || cat.name}
                          value={cat.id.toString()}
                        >
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>

                {formik.errors?.category ? (
                  <p className="text-xs text-red-600 mt-1">
                    {formik.errors.category}
                  </p>
                ) : null}
              </div>
            </Form>
          </div>
          <SheetFooter className="flex flex-row items-center justify-end">
            <Button
              onClick={formik.submitForm}
              loading={formik.isSubmitting}
              className="w-fit"
            >
              Create Listing
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </FormikProvider>
  );
};

export default CreateListingSheet;
