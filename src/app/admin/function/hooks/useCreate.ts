import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import functionUrls from "@/utils/url/adminPanel/function/functionUrl";
import { z } from "zod";

const functionSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const createNewFunction = async (data: unknown) => {
  const validationResult = functionSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(
      `${functionUrls.createFunction}`,
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
