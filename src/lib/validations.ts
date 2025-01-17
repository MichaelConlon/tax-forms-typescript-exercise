import * as yup from "yup";

// Optional Address Schema
// If any of these fields are present, then the other fields are required
export const OptionalAddressSchema = yup.object({
  address1: yup.string().test('conditional-required', 'Address is required', function(value: string | undefined): boolean {
    const { city, state, zip } = this.parent;
    // If any of the city, state, or zip are present, then address1 is required
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

// Contact Information Schema
// If any of these fields are present, then the other fields are required
export const ContactInformationSchema = yup.object({
    firstName: yup.string().test('conditional-required', 'First Name is required', function(value: string | undefined): boolean {
        const { lastName, email, phoneNumber } = this.parent;
        return !(lastName || email || phoneNumber) || (!!value && value.length >= 1);
    }),
    lastName: yup.string().test('conditional-required', 'Last Name is required', function(value: string | undefined): boolean {
        const { firstName, email, phoneNumber } = this.parent;
        return !(firstName || email || phoneNumber) || (!!value && value.length >= 1);
    }),
    email: yup.string().test('conditional-required', 'Email is required', function(value: string | undefined): boolean {
        const { firstName, lastName, phoneNumber } = this.parent;
        return !(firstName || lastName || phoneNumber) || (!!value && value.length >= 1);
    }).email('Must be a valid email'),
    phoneNumber: yup.string().test('conditional-required', 'Phone Number is required', function(value: string | undefined): boolean {
        const { firstName, lastName, email } = this.parent;
        return !(firstName || lastName || email) || (!!value && value.length >= 1);
    })
});

export const StatementSchema = yup.object({
    name: yup.string().required().min(1),
    contactInformation: ContactInformationSchema.nullable()
});
  