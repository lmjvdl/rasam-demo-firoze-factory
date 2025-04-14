import { z } from "zod";

export const contactsInitialData = {
    data: {
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
  } as const;
  

  export const arrayOfPermission = z.object({
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
  

export function contactsSanitizer(rawData: unknown) {
  const serverSchema = arrayOfPermission.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : contactsInitialData.data.results;
}

