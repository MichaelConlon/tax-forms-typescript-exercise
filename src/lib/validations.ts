import * as yup from "yup";

export const OptionalAddressSchema = yup.object({
  address1: yup.string().test('conditional-required', 'Address is required', function(value: string | undefined): boolean {
    const { city, state, zip } = this.parent;
    return !(city || state || zip) || (!!value && value.length >= 1);
  }),
  address2: yup.string().optional(),
  city: yup.string().test('conditional-required', 'City is required', function(value: string | undefined): boolean {
    const { address1, state, zip } = this.parent;
    return !(address1 || state || zip) || (!!value && value.length >= 1);
  }),
  state: yup.string().test('conditional-required', 'State is required', function(value: string | undefined): boolean {
    const { address1, city, zip } = this.parent;
    return !(address1 || city || zip) || (!!value && value.length >= 1);
  }),
  zip: yup.string().test('conditional-required', 'Zip is required', function(value: string | undefined): boolean {
    const { address1, city, state } = this.parent;
    return !(address1 || city || state) || (!!value && value.length >= 1);
  })
});

export const RequiredAddressSchema = yup.object({
  address1: yup.string().required("Address is required").min(1),
  address2: yup.string().optional(),
  city: yup.string().required("City is required").min(1),
  state: yup.string().required("State is required").min(1),
  zip: yup.string().required("Zip is required").min(1)
});

export const ListingSchema = yup.object({
  name: yup.string().required().min(1),
  physicalAddress: RequiredAddressSchema.required(),
  mailingAddress: OptionalAddressSchema.nullable()
});

export const SubmissionSchema = yup.object({
    id: yup.string().optional(),
    listing: ListingSchema.required(),
    createdAt: yup.string().optional(),
    reason: yup.string().required("Reason is required").min(1)
  });

  