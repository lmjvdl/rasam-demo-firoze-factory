import { z } from "zod";

export const productLineInitialData = {
    data: {
      count: 0,
      next: null,
      previous: null,
      page_size: 0,
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
  } as const;
  

  export const arrayOfProductLine = z.object({
    data: z.object({
      count: z.number(),
      next: z.string().nullable(),
      previous: z.string().nullable(),
      results: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      ),
    }),
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
  });
  

export function productLineSanitizer(rawData: unknown) {
  const serverSchema = arrayOfProductLine.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : productLineInitialData.data.results;
}

