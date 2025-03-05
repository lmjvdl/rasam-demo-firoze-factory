import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import deviceDataUrls from "@/utils/URLs/adminPanel/deviceData/deviceDataUrl";
import { z } from "zod";

const deviceDataSchema = z.object({
  device: z.number().min(1, "شناسه دستگاه الزامی است"),
  data_type: z.array(z.number()).nonempty("نوع داده الزامی است"),
});

export const createNewDataType = async (data: unknown) => {
  const validationResult = deviceDataSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  try {
    const response = await fetchWithErrorForCreate(`${deviceDataUrls.createDataType}`, {
      method: "POST",
      body: JSON.stringify(validationResult.data),
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