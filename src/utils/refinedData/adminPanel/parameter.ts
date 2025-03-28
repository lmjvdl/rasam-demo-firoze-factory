import { z } from "zod";

export const parameterInitialData = {
    data: {
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
  } as const;

  export const arrayOfParameter = z.object({
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
  

export function parameterSanitizer(rawData: unknown) {
  const serverSchema = arrayOfParameter.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : parameterInitialData.data.results;
}

