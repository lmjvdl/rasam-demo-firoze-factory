import { BaalMillLiveSchema } from "@/interfaces/preparingBody/live";
import { z } from "zod";

// داده‌های پیش‌فرض
export const ballMillInitialDataQuery = {
  online: false,
  device: "",
  time: "0",  // تغییر نوع به string
  product_line_part: 0,
  data: {
    current: 0
  },
} as const;

// تعریف schema
export const arrayOfBaalMill = z.object({
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

// فانکشن برای سنیتایز کردن داده‌ها
export function baalMillSanitizer(rawData: unknown): BaalMillLiveSchema[] {
  const serverSchema = arrayOfBaalMill.safeParse(rawData);

  // در صورتی که سرور داده‌ها را به درستی ارسال کرده باشد
  if (serverSchema.success) {
    return serverSchema.data.data.map((item) => ({
      online: item.online === true,  // اگر online در داده سرور null باشد، false فرض می‌شود
      device: item.device,
      time: String(item.time),  // تبدیل به string
      product_line_part: item.product_line_part,
      data: {
        current: item.data.current,
      },
    }));
  }

  // در غیر این صورت داده پیش‌فرض را برمی‌گردانیم که به صورت آرایه است
  return [ballMillInitialDataQuery];  // تبدیل به آرایه
}
