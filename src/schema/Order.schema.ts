import z from "zod";

export const OrderFormSchema = z.object({
  address: z.object({
    addressLine: z
      .string()
      .nonempty("address line is required")
      .refine((value) => value.trim().length >= 4, {
        message: "address line must be at least 4 characters",
      }),
    city: z
      .string()
      .nonempty("city is required")
      .refine((value) => value.trim().length >= 2, {
        message: "city must be at least 2 characters",
      }),
    country: z
      .string()
      .nonempty("country is required")
      .refine((value) => value.trim().length >= 2, {
        message: "country must be at least 2 characters",
      }),
  }),
  customer: z.object({
    fullName: z
      .string()
      .nonempty("full name is required")
      .refine((value) => value.trim().length >= 4, {
        message: "full name must be at least 4 characters",
      }),
    email: z
      .string()
      .email("invalid email")
      .nonempty("email is required")
      .min(4, { message: "email must be at least 4 characters" }),
    phone: z
      .string()
      .nonempty("phone number is required")
      .min(10, { message: "phone number at least 10 characters" })
      .max(10, { message: "phone number at most 10 characters" })
      .regex(/^\d+$/, "phone number must be a number"),
  }),
});
