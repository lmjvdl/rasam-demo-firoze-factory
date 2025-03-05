import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import dataTypeUrls from "@/utils/URLs/adminPanel/dataType/dataTypeUrl";
import { z } from "zod";

const dataTypeSchema = z.object({
  name: z.string().min(1, "نام نوع داده الزامی است").max(30),
  json_field: z.string().min(1, "فیلد JSON الزامی است").max(30),
  description: z.string().max(255).nullable().optional(),
});

export const createNewDataType = async (data: unknown) => {
  const validationResult = dataTypeSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${dataTypeUrls.createDataType}`, {
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
