import { z } from "zod";
import { initialData } from "./initialData/initialData";

  export const arrayOfFunction = z.object({
    data: z.object({
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
  

export function intervalSanitizer(rawData: unknown) {
  const serverSchema = arrayOfFunction.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : initialData.data.results;
}

