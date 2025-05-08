import { z } from "zod";

export const arrayOfData = z.object({
    data: z.object({
      results: z.array(
        z.object({
          id: z.number().optional().default(0),
          name: z.string().optional().default(""),
          username: z.string().optional().default(""),
          translate: z.string().optional().default("")
        })
      ),
    }),
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
});