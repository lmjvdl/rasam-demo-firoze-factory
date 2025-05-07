import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import intervalUrls from "@/utils/url/adminPanel/intervalUrl";
import { z } from "zod";

const intervalSchema = z.object({
  name: z.string(),
  duration: z.string(),
});

export const createNewInterval = async (data: unknown) => {
  const validationResult = intervalSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${intervalUrls.createInterval}`, {
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
