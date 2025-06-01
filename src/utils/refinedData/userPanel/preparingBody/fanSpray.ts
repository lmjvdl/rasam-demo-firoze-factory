import { MultiSensorLiveSchema } from "@/interfaces/user/lives/multiSensor";
import { z } from "zod";

export const fanSprayInitialDataQuery = {
  online: "off",
  device: 0,
  time: 0, 
  product_line_part: 0,
  device_code: "",
  data: {
    current: 0,
  },
} as const;

export const arrayOfFanSpray = z.object({
  data: z.array(
    z.object({
      device: z.number(),
      device_code: z.string(),
      product_line_part: z.number(),
      time: z.number(),
      online: z.string(),
      data: z.object({
        current: z.number(),
      }),
    })
  ),
  status_code: z.number(),
  success: z.boolean(),
  messages: z.string(),
});

export function fanSpraySanitizer(rawData: unknown): MultiSensorLiveSchema[] {
  const serverSchema = arrayOfFanSpray.safeParse(rawData);

  if (serverSchema.success) {
    return serverSchema.data.data.map((item) => ({
      online: item.online,
      device: item.device,
      device_code: item.device_code,
      time: item.time,
      product_line_part: item.product_line_part,
      data: {
        current: item.data.current,
      },
    }));
  }

  return [fanSprayInitialDataQuery];
}
