import { z } from "zod";
import { initialData } from "./initialData/initialData";

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

  return serverSchema.success ? serverSchema.data.data.results : initialData.data.results;
}

