import { z } from "zod";
import { initialData } from "./initialData/initialData";

  export const arrayOfPermission = z.object({
    data: z.object({
      results: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          json_field: z.string(),
          description: z.string().nullable()
        })
      ),
    }),
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
  });
  

export function dataTypeSanitizer(rawData: unknown) {
  const serverSchema = arrayOfPermission.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : initialData.data.results;
}

