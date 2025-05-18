import { z } from "zod";

const productLineResponseSchema = z
  .object({
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
    data: z.object({
        company_id: z.number(),
        company_name: z.string(),
        company_logo: z.string(),
        product_lines: z.object({
            id: z.number(),
            name: z.string(),
            icon: z.string().nullable()
        }).array()
    }),
})

export type ProductLineResponse = z.infer<typeof productLineResponseSchema>;

export default function ProductLineResponseSanitizer(pollutedData: unknown) {
  try {
    return productLineResponseSchema.parse(pollutedData);
  } catch (err) {
    throw new Error("متاسفانه داده دریافتی ناقص است لطفا دوباره تلاش نمایید.");
  }
}