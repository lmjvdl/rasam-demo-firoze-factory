import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import positionUrls from "@/utils/url/adminPanel/positionUrl";
import { z } from "zod";

const positionSchema = z.object({
  name: z.string(),
});

export const createNewPosition = async (data: unknown) => {
  const validationResult = positionSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${positionUrls.createPosition}`, {
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
