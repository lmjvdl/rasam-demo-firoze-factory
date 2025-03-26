import { z } from "zod";

export const alarmInitialData = {
    data: {
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
  } as const;
  

  export const arrayOfAlarm = z.object({
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
  

export function alarmSanitizer(rawData: unknown) {
  const serverSchema = arrayOfAlarm.safeParse(rawData);

  return serverSchema.success ? serverSchema.data.data.results : alarmInitialData.data.results;
}

