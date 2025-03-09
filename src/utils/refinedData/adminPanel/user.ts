import { z } from "zod";

export const userInitialData = {
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
  

  export const arrayOfUser = z.object({
    data: z.object({
      count: z.number(),
      next: z.string().nullable(),
      previous: z.string().nullable(),
      page_size: z.number(),
      results: z.array(
        z.object({
          id: z.number(),
          username: z.string(),
        })
      ),
    }),
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
  });
  

export function userSanitizer(rawData: unknown) {
  const serverSchema = arrayOfUser.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : userInitialData.data.results;
}

