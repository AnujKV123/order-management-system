import z from "zod";

export const SKUFormSchema = z.object({
  name: z
    .string()
    .nonempty("sku name is required")
    .refine((value) => value.trim().length >= 4, {
      message: "sku name must be at least 4 characters",
    }),
  code: z
    .string()
    .nonempty("sku code is required")
    .refine((value) => value.trim().length >= 4, {
      message: "sku code must be at least 4 characters",
    }),
  price: z.string().refine((value) => parseFloat(value) > 0, {
    message: "price must be positive",
  }),
  status: z.object({
    label: z.string(),
    value: z.string(),
  }),
});
