import { z } from "zod";

export const deviceInitialData = {
    data: {
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
  } as const;
  

  export const arrayOfDevice = z.object({
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
  

export function deviceSanitizer(rawData: unknown) {
  const serverSchema = arrayOfDevice.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : deviceInitialData.data.results;
}

