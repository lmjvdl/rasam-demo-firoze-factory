import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import inputItemsUrls from "@/utils/url/adminPanel/inputItemUrl";
import { z } from "zod";

const inputItemSchema = z.object({
  name: z.string().min(1).max(50),
});

export const createNewInputItem = async (data: unknown) => {
  const validationResult = inputItemSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${inputItemsUrls.createInputItem}`, {
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
