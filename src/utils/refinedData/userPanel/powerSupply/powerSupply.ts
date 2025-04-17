// src/utils/refinedData/userPanel/power-supply/powerSupply.ts
import { PowerSupplyLiveSchema } from "@/interfaces/powerSupply/live";
import { z } from "zod";

export const powerSupplyInitialDataQuery: PowerSupplyLiveSchema = {
  online: "off",
  device: 0,
  time: 0,
  product_line_part: 0,
  device_code: "",
  data: {
    currentL1: 0,
    currentL2: 0,
    currentL3: 0,
    currentAvg: 0,
    VoltageAvg: 0,
    ActivePowerTotal: 0,
    ApparentPowerTotal: 0,
    PowerFactorTotal: 0,
    ActiveEnergyDelivered: 0,
  },
} as const;

export const arrayOfPowerSupply = z.object({
  data: z.array(
    z.object({
      device: z.number(),
      device_code: z.string(),
      product_line_part: z.number(),
      time: z.number(),
      online: z.string(),
      data: z.object({
        currentL1: z.number(),
        currentL2: z.number(),
        currentL3: z.number(),
        currentAvg: z.number(),
        VoltageAvg: z.number(),
        ActivePowerTotal: z.number(),
        ApparentPowerTotal: z.number(),
        PowerFactorTotal: z.number(),
        ActiveEnergyDelivered: z.number(),
      }),
    })
  ),
  status_code: z.number(),
  success: z.boolean(),
  messages: z.string(),
});

export function powerSupplySanitizer(rawData: unknown): PowerSupplyLiveSchema[] {
  const serverSchema = arrayOfPowerSupply.safeParse(rawData);

  if (serverSchema.success) {
    return serverSchema.data.data.map((item) => ({
      online: item.online,
      device: item.device,
      device_code: item.device_code,
      time: item.time,
      product_line_part: item.product_line_part,
      data: {
        currentL1: item.data.currentL1,
        currentL2: item.data.currentL2,
        currentL3: item.data.currentL3,
        currentAvg: item.data.currentAvg,
        VoltageAvg: item.data.VoltageAvg,
        ActivePowerTotal: item.data.ActivePowerTotal,
        ApparentPowerTotal: item.data.ApparentPowerTotal,
        PowerFactorTotal: item.data.PowerFactorTotal,
        ActiveEnergyDelivered: item.data.ActiveEnergyDelivered,
      },
    }));
  }

  return [powerSupplyInitialDataQuery];
}