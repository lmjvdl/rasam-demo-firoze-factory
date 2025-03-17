import { FanSprayLiveSchema } from "@/interfaces/preparingBody/live";
import { z } from "zod";

export const fanSprayInitialDataQuery = {
  online: false,
  device: "",
  time: "0", 
  product_line_part: 0,
  data: {
    current: 0
  },
} as const;

export const arrayOfFanSpray = z.object({
  data: z.array(
    z.object({
      device: z.string(),
      product_line_part: z.number(),
      time: z.number(),
      online: z.boolean().nullable(),
      data: z.object({
        current: z.number(),
      }),
    })
  ),
  status_code: z.number(),
  success: z.boolean(),
  messages: z.string(),
});

export function fanSpraySanitizer(rawData: unknown): FanSprayLiveSchema[] {
  const serverSchema = arrayOfFanSpray.safeParse(rawData);

  if (serverSchema.success) {
    return serverSchema.data.data.map((item) => ({
      online: item.online === true,
      device: item.device,
      time: String(item.time),
      product_line_part: item.product_line_part,
      data: {
        current: item.data.current,
      },
    }));
  }

  return [fanSprayInitialDataQuery];
}
