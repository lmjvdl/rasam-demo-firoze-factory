import { z } from "zod";

export const companyInitialData = {
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
  

  export const arrayOfCompany = z.object({
    data: z.object({
      count: z.number(),
      next: z.string().nullable(),
      previous: z.string().nullable(),
      page_size: z.number(),
      results: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          description: z.string().nullable(),
          code: z.string(),
          logo: z.string().nullable(),
        })
      ),
    }),
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
  });
  

export function companySanitizer(rawData: unknown) {
  const serverSchema = arrayOfCompany.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : companyInitialData.data.results;
}

