import { z } from "zod";
import { initialData } from "./initialData/initialData";

  export const arrayOfPermission = z.object({
    data: z.object({
      results: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
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

  return serverSchema.success ? serverSchema.data.data.results : initialData.data.results;
}

