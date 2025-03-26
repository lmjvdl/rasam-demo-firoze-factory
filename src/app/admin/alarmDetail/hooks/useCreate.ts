import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import alarmDetailUrls from "@/utils/url/adminPanel/alarmDetail/alarmDetailUrl";
import { z } from "zod";

const alarmDetailSchema = z.object({
  parameter: z.number().int(),
  value: z.number().int().min(-2147483648).max(2147483647),
  alarm: z.number().int(),
});

export const createNewAlarmDetail = async (data: unknown) => {
  const validationResult = alarmDetailSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${alarmDetailUrls.createAlarmDetail}`, {
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
