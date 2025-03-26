import { z } from "zod";

export const functionInitialData = {
    data: {
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
  } as const;
  

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
  

export function functionSanitizer(rawData: unknown) {
  const serverSchema = arrayOfFunction.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : functionInitialData.data.results;
}

