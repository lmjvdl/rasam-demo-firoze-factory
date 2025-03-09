import { z } from "zod";

export const permissionInitialData = {
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
  

  export const arrayOfPermission = z.object({
    data: z.object({
      count: z.number(),
      next: z.string().nullable(),
      previous: z.string().nullable(),
      page_size: z.number(),
      results: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          codename: z.string(),
          translate: z.string(),
        })
      ),
    }),
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
  });
  

export function permissionSanitizer(rawData: unknown) {
  const serverSchema = arrayOfPermission.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : permissionInitialData.data.results;
}

