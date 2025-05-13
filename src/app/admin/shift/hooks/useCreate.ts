import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import DateToTime from "@/utils/formatters/dateToTime";
import formatUnixTimeToDateString from "@/utils/formatters/unixToDate";
import shiftUrls from "@/utils/url/adminPanel/shiftUrl";
import { DateObject } from "react-multi-date-picker";
import { z } from "zod";

const shiftSchema = z.object({
  name: z.string(),
  start_date: z.custom<DateObject>((val) => val instanceof DateObject),
  end_date: z.custom<DateObject>((val) => val instanceof DateObject),
  start_time: z.custom<DateObject>((val) => val instanceof DateObject),
  end_time: z.custom<DateObject>((val) => val instanceof DateObject),
});

export const createNewShift = async (data: unknown) => {
  const validationResult = shiftSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    start_date: formatUnixTimeToDateString(validationResult.data.start_date.unix),
    end_date: formatUnixTimeToDateString(validationResult.data.end_date.unix),
    start_time: DateToTime(validationResult.data.start_time),
    end_time: DateToTime(validationResult.data.end_time),
  };

  try {
    const response = await fetchWithErrorForCreate(`${shiftUrls.createShift}`, {
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
