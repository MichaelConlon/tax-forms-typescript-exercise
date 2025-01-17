import * as yup from "yup";

export const AddressSchema = yup.object({
    address1: yup.string().required("Address is required").min(1),
    address2: yup.string().optional(),
    city: yup.string().required("City is required").min(1),
    state: yup.string().required("State is required").min(1),
    zip: yup.string().required("Zip is required").min(1)
  });

export const ListingSchema = yup.object({
    name: yup.string().required().min(1),
    physicalAddress: AddressSchema.required(),
    mailingAddress: AddressSchema.optional()
  });

export const SubmissionSchema = yup.object({
    id: yup.string().optional(),
    listing: ListingSchema.required(),
    createdAt: yup.string().optional(),
    reason: yup.string().required("Reason is required").min(1)
  });

  