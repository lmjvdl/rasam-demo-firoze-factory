import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import alarmUrls from "@/utils/url/adminPanel/alarm/alarmUrl";
import { z } from "zod";

const alarmSchema = z.object({
  name: z.string(),
  function: z.number(),
  description: z.string(),
  device: z.number(),
  type: z.number(),
  message: z.string(),
  receiver: z.number(),
  message_type: z.string(),
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
  } catch {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
};
