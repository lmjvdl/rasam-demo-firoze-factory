import { z } from "zod";

export const initialDataProductLine = {
    data: {
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
} as const;
  

export const productLineDataArray = z.object({
  data: z.array(
    z.object({
      company_id: z.number(),
      company_name: z.string(),
      company_logo: z.string(),
      product_lines: z.object({
        id: z.number(),
        name: z.string(),
        light_icon: z.string().nullable(),
        dark_icon: z.string().nullable(),
      }).array()
    })
  ),
  status_code: z.number(),
  success: z.boolean(),
  messages: z.string(),
});
