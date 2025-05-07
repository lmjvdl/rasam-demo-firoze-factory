import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import shiftUrls from "@/utils/url/adminPanel/shiftUrl";
import { z } from "zod";

const shiftSchema = z.object({
  name: z.string().min(1).max(200),
});

export const createNewShift = async (data: unknown) => {
  const validationResult = shiftSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
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
