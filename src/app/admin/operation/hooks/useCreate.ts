import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import operationUrls from "@/utils/url/adminPanel/operation/operation";
import { z } from "zod";

const operationSchema = z.object({
  name: z.string(),
  devices: z.array(z.number()),
});

export const createNewOperation = async (data: unknown) => {
  const validationResult = operationSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${operationUrls.createOperation}`, {
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
