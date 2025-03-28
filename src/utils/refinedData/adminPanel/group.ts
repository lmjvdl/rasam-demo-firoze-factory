import { z } from "zod";

export const groupInitialData = {
    data: {
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
  } as const;
  

  export const arrayOfGroup = z.object({
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
  

export function groupSanitizer(rawData: unknown) {
  const serverSchema = arrayOfGroup.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : groupInitialData.data.results;
}

