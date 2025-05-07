import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import alarmDetailUrls from "@/utils/url/adminPanel/alarmDetailUrl";
import { z } from "zod";

const alarmDetailSchema = z.object({
  parameter: z.number(),
  value: z.string(),
  alarm: z.number(),
});

export const createNewAlarmDetail = async (data: unknown) => {
  const validationResult = alarmDetailSchema.safeParse(data);
  
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    value: Number(validationResult.data.value)
  };

  try {
    const response = await fetchWithErrorForCreate(
      `${alarmDetailUrls.createAlarmDetail}`,
      {
        method: "POST",
        body: JSON.stringify(processedData),
      }
    );

    if (response.status_code === 201 && response.success) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        error: response.messages || "خطایی رخ داده است",
      };
    }
  } catch {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
};
