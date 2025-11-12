import { FormikHelpers } from "formik";
import { useCreateListingMutation } from "../services/listings.mutation";
import { TCreateListingInitialValues } from "../types/listing.types";
import { handleApiError, resetFormStatus } from "@/modules/common/lib/utils";
import { useRouter } from "next/navigation";

export const useListing = () => {
  const { mutateAsync: createListingMutation } = useCreateListingMutation();
  const router = useRouter();

  const createListing = async (
    values: TCreateListingInitialValues,
    helpers: FormikHelpers<TCreateListingInitialValues>
  ) => {
    try {
      resetFormStatus(helpers);
      const { id } = await createListingMutation(values);

      router.push(`/listings/${id}`);
    } catch (error) {
      helpers.setStatus({ error: handleApiError(error).message });
    }
  };

  return {
    createListing,
  };
};
