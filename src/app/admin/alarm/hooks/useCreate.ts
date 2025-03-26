import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import alarmUrls from "@/utils/url/adminPanel/alarm/alarmUrl";
import { z } from "zod";

const alarmDetailSchema = z.object({
  parameter: z.number().int("پارامتر باید یک عدد صحیح باشد").min(-2147483648).max(2147483647),
  value: z.number().int("مقدار باید یک عدد صحیح باشد").min(-2147483648).max(2147483647),
});

const alarmSchema = z.object({
  name: z.string().min(1, "نام هشدار الزامی است").max(100),
  function: z.number().int("عملکرد باید یک عدد صحیح باشد").min(1, "عملکرد الزامی است"),
  description: z.string().min(1, "توضیحات الزامی است"),
  device: z.number().int("دستگاه باید یک عدد صحیح باشد").min(1, "دستگاه الزامی است"),
  type: z.number().int("نوع باید یک عدد صحیح باشد").min(1, "نوع الزامی است"),
});

export const createNewAlarm = async (data: unknown) => {
  const validationResult = alarmSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${alarmUrls.createAlarm}`, {
      method: "POST",
      body: JSON.stringify(processedData),
    });

    if (response.status_code === 201 && response.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.messages || "خطایی رخ داده است" };
    }
  } catch (error) {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
};
