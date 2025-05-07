import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import liveTypesUrls from "@/utils/url/adminPanel/liveTypesUrl";
import { z } from "zod";

const liveTypeSchema = z.object({
  name: z.string(),
});

export const createNewLiveType = async (data: unknown) => {
  const validationResult = liveTypeSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${liveTypesUrls.createLiveTypes}`, {
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
